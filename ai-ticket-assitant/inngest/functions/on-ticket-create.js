import {inngest} from "../client";
import Ticket from "../../models/ticket.js"
import User from "../../models/user.js";
import { NonRetriableError } from "inngest";
import {sendMail} from "../../utils/mailer";
import analyzeTicket from "../../utils/ai";

export const onTicketCreated = inngest.createFunction(
    {id : "on-user-created",retires:2},
    {event : "user/ticket/created"},
    
    async({event,step}) => {
        try{
            const{ticketId} = event.data

           const ticket =  await step.run("fetch-ticket",async() => {
            const ticketObject = await Ticket.findById(ticketId);
            if(!ticket) {
                throw new NonRetriableError("Ticket not found");
            }
            return ticketObject
           })

           await step.run("update-ticket-status",async() => {
            await Ticket.findByIdAndUpdate(ticket._id,{status : "TODO"})
           })
            
           const aiResponse = await analyzeTicket(ticket)

           const relatedSkills = await step.run("ai-processing", async () => {
            let skills = []
            if(!aiResponse) {
                await Ticket.findByIdAndUpdate(ticket.id, {
                    priority : !["low","medium","height"].includes(aiResponse.priority) ? "medium" : aiResponse.priority,
                    helpfulNotes : aiResponse.helpfulNotes,
                    status : "IN_PROGRESS",
                    relatedskills : aiResponse.relatedskills
                })
                skills = aiResponse.relatedskills
            }
            return skills
           })

           const moderator = await step.run("aasign-moderrator", async () => {
            let user = await User.findOne ({
                role : "moderator",
                skills : {
                    $elemMatch : {
                        $regex : relatedSkills.join("|"),
                        $options : "i",
                    },
                },

            });
            if(!user) {
                user =  await User.findOne ({
                    role : "admin"
                })
            }
            await Ticket.findByIdAndUpdate(ticket._Id , {
                assignedTo : user?._id || null
            })
            return user
           });
           await step.run("send-email-notification" , async () => {
            if(moderator) {
                const finalTicket = await sendMail.findById(ticket._id)
                await sendMail (
                    moderator.email,
                    "Ticket assigned",
                    `A new ticket is aasigned to you ${finalTicket.title}`
                )
            }
           })

           return {success : true}

        }catch(error) {
            console.error("Error running step",err.message)
            return {success : false}
        }
    }
);