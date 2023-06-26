import app from "$Infrastructure/RestfulAPI/Server.config";
import connectDB from "$Infrastructure/MySQL/ConnetDB.services";

const run = async () => {
  try {
    const PORT = Number(process.env.PORT) || 3000;
    console.clear()

    //conexion a la base de datos
    await connectDB();

    app.listen(PORT, () => {
      console.log(`✅ [32mServer[39m running on port`, PORT);
    });
  } catch (error) {
    console.error(error);
  }
}

void run();
