import Image from "next/image";
import PDFUpload from "./components/Upload_pdf_field";

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
    </main>
  );
}
