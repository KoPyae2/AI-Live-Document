"use client"

import React from 'react';
import Document from '@/components/Document';

async function DocumentPage({params: {id}}: {
    params: {
      id: string
    }
  }) {

    return (
        <div className='flex flex-col flex-1'>
            <Document id={id} />
        </div>
    );
}

export default DocumentPage;