import moment from "moment";

class Logger {
  get getTime(): string {
    return moment().format("hh:mm:ss");
  }

  listening(port: number): void {
    console.log(`[${this.getTime}][APP]: Server running on http://localhost:${port}/`);
  }

  mongo(): void {
    console.log(`[${this.getTime}][MONGODB]: Connected to mongodb`);
  }

  error(type: string, error: { stack: string }) {
    console.error(`[ERROR][${type.toUpperCase()}]: ${error.stack}`);
  }
}

export default new Logger();
