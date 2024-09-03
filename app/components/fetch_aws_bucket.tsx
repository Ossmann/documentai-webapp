'use client'

import { useEffect, useState } from 'react';

interface File {
    key: string;
    url: string;
}

export default function FileList() {
    const [files, setFiles] = useState<File[]>([]);

    useEffect(() => {
        async function fetchFiles() {
            const response = await fetch('/api/list-files');
            const data = await response.json();
            setFiles(data.files);
        }

        fetchFiles();
    }, []);

    return (
        <div>
            <div className='text-lg font-bold'>
                Dowload Files
                </div>
            <div>Wait until your extracted data appears hear, then download.</div>
            <ul>
                {files.map(file => (
                    <li key={file.key}>
                        <a href={file.url} download>
                            {file.key.replace('processed-data/', '')}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}