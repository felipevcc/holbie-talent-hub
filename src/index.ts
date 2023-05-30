import app from "./config/server.config";
import connectDB from "./services/ConnetDB.services";

const run = async () => {
  try {
    const PORT = Number(process.env.PORT) || 3000;
    console.clear()

    //conecion a la base de datos
    await connectDB();

    app.listen(PORT, () => {
      console.log(`✅ [32mServer[39m running on port`, PORT);
    });
  } catch (error) {
    console.error(error);
  }
}

void run();
