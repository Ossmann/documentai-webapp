'use client'

import React, { useState } from 'react';
import { uploadPDFtoAWS } from './upload_pdf_AWS_action';

export default function PDFUpload(){

    return (
        <form action={uploadPDFtoAWS} className="flex flex-col gap-4">
            <label>
                <input type="file" name="fileInput" id="fileInput" />
            </label>
            <button 
                    className="text-white font-bold text-lg w-full p-2 rounded bg-green-700 hover:bg-gray-500 !important" 
                    type="submit"
                >
                    SUBMIT
                </button>
        </form>
    );
}
