import Image from "next/image";
import PDFUpload from "./components/Upload_pdf_field";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

     <PDFUpload />
      
    </main>
  );
}
