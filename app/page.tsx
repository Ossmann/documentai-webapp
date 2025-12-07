import Image from "next/image";
import PDFUpload from "./components/upload_pdf_field";
import FileList from "./components/fetch_aws_bucket";
import LottiePlayer from "./components/LottiePlayer";

export default function Home() {
  return (
    <main className="flex flex-col text-center min-h-screen items-center justify-center space-y-8">
      <div className="text-6xl font-bold">
        Document AI
      </div>
      <div className="text-2xl font-bold">
        Financial Reports Analyser
      </div>

      <div className="w-60">
        <LottiePlayer />
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
          <div className="flex">
            <div className="font-bold text-underline">
              Total stockholders&apos; equity 2024 2023:&nbsp; 
            </div>
            The total value that the stockholders own. Assets minus liabilities.
          </div>
          <div className="flex">
            <div className="font-bold text-underline">
              Daily Active Users:&nbsp;
            </div>
            How many daily active users does the company&apos;s application have?
          </div>
          <div className="flex">
            <div className="font-bold text-underline">
              Biggest risk to the company:&nbsp;
            </div>
            What is the biggest risk or uncertainty to the company&apos;s earnings going forward?
          </div>
          <div className="flex">
            <div className="font-bold text-underline">
              Biggest opportunity:&nbsp;
            </div>
            What is the biggest opportunity for the business to increase revenue or market share in the coming years?
          </div>
        </div>
      </div>

      <FileList />
    </main>
  );
}
