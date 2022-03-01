import mongoose from 'mongoose'
import config from 'config'

export async function dbConnect() {
 try {
  await mongoose.connect(config.get('DATABASE_URL'))
  console.log('database connected....')
 } catch (error) {
  console.error(error)
  process.exit(1)
 }
}
