import mongoose from "mongoose";
import colors from "colors";
const connectDB = async () => {
  try {
  //  const conn = await mongoose.connect('mongodb+srv://Vithyawessalini:7Ty1Nlwmpt05br4g@cluster0.95wjl6y.mongodb.net/?retryWrites=true&w=majority');
  const conn = await mongoose.connect('mongodb+srv://Vithyawessalini:7Ty1Nlwmpt05br4g@cluster0.95wjl6y.mongodb.net/mobile');
    console.log(
      `Conneted To Mongodb Databse ${conn.connection.host}`.bgMagenta.white
    );
 } catch (error) {
  console.log(`Errro in Mongodb ${error}`.bgRed.white);
 }
};

 export default connectDB;
