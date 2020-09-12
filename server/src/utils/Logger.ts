import moment from "moment";

class Logger {
  get getTime(): string {
    return moment().format("hh:mm:ss");
  }

  listening(port: number): void {
    console.log(`[${this.getTime}][APP]: Started on port: ${port}`);
  }

  mongo(): void {
    console.log(`[${this.getTime}][MONGODB]: Connected to mongodb`);
  }

  error(error: string, type: string) {
    console.error(`[ERROR][${type.toUpperCase()}]: ${error}`);
  }
}

export default new Logger();
