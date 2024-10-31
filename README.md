# Live Document Collaboration Platform

Welcome to the **Live Document Collaboration Platform**! This innovative project allows users to create documents, collaborate in real-time, and leverage AI features for translation, summarization, and interactive Q&A. 

## Features

- **User Registration**: Users can create accounts to access the platform.
- **Document Creation**: Users can create and edit documents seamlessly.
- **Collaboration**: Invite other users to collaborate on documents in real-time, with live updates on who is editing.
- **AI Integration**: 
  - **Translation**: Instantly translate your documents into multiple languages.
  - **Summarization**: Get concise summaries of lengthy documents.
  - **Interactive Q&A**: Ask questions about the document and receive AI-generated answers.

## Technologies Used

- **Next.js**: A powerful React framework for building server-side rendered applications.
- **Cloudflare Workers**: Runs the AI API to process requests and deliver real-time responses.

## Folder Structure

```plaintext
├── cloudflare-worker         # Contains the Cloudflare Worker for AI API
│   ├── src                   # Source code for the worker
│   └── wrangler.toml         # Configuration file for Cloudflare Workers
├── nextjs                    # Contains the Next.js application
│   ├── actions               # Action functions for managing state and logic
│   ├── public                # Static assets (images, fonts, etc.)
│   ├── src                   # Source code for the Next.js application
│   │   ├── pages             # Next.js pages
│   │   ├── components        # Reusable React components
│   │   └── styles            # Stylesheets for the application
│   └── package.json          # Project dependencies and scripts
└── README.md                 # Project documentation
```

Installing and Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/KoPyae2/Ai-Live-Document.git
   cd Ai-Live-Document

2. **Install Dependencies**:
   - For the Next.js application:
    ```bash
    cd nextjs
    npm install
    ```
    
    - For the Cloudflare Worker:
    ```bash
    cd cloudflare-worker
    npm install

3. **Configure Environment Variables**:
    - Create a `.env.local` file in the `next-js` directory and add your environment variables as needed (in .env.example).
    - service.json is generate firabase service key json file and replace it 

4. **Start the Next.js Application**:
    - check your current dir is Ai-Live-Document
    ```bash
    cd nextjs
    npm run dev

5. **Deploy the Cloudflare Worker**:
    ```bash
    cd ../cloudflare-worker
    npm run deploy