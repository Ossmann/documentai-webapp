import Image from "next/image";
import PDFUpload from "./components/Upload_pdf_field";
import FileList from "./components/fetch_aws_bucket";

export default function Home() {
  return (
    <main className="flex flex-col text-center min-h-screen items-center justify-center space-y-8">
      <div className="text-6xl font-bold pb-20">
        Document AI
      </div>

      <div className="">
        Upload a pdf file to extract data from it with AI.
      </div>

      <PDFUpload />

      <div className="">
        Work in progress. Limit 5 pages max.
      </div>

      <div>
        Currently the app filters for the following variables:
        <div className="text-sm text-left pt-2">
          <div>
          "room_config": "Find a type of room'.",
          </div>
          <div>
          "High_season_rate": "How much does this room cost in high season?",
          </div>
          <div>
          "destination": "What is the destination that offers an accommodation?"
          </div>
        </div>
      </div>

      <FileList />
    </main>
  );
}
