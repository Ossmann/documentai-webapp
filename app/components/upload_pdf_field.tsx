'use client'

import React, { useState } from 'react';
import { uploadPDFtoAWS } from './upload_pdf_AWS_action';

export default function PDFUpload(){

    return (
        <form action={uploadPDFtoAWS} className="flex flex-col gap-4">
            <label>
                <span>Upload a file</span>
                <input type="file" name="fileInput" id="fileInput" />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}
