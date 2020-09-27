import mongoose from 'mongoose'

interface TicketAttrs {
  title: string
  price: number
  userId: string
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc
}

interface TicketDoc extends mongoose.Document {
  title: string
  price: number
  userId: string
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    price: {
      required: true,
      type: Number,
    },
    userId: {
      required: true,
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = doc._id
        delete ret._id
        delete ret.__v
      },
    },
  }
)

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs)
}

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema)

export { Ticket }
