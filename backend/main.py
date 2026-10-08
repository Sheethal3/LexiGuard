from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from pypdf import PdfReader
from docx import Document

import io


app = FastAPI()


# Allow our HTML frontend to communicate
# with the Python backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():

    return {
        "message": "LexiGuard backend is running"
    }


@app.post("/upload")
async def upload_contract(
    file: UploadFile = File(...)
):

    filename = file.filename

    # Read the uploaded file
    file_data = await file.read()


    # --------------------------------
    # PDF
    # --------------------------------

    if filename.lower().endswith(".pdf"):

        pdf_file = io.BytesIO(file_data)

        reader = PdfReader(pdf_file)

        text = ""

        for page in reader.pages:

            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"


    # --------------------------------
    # DOCX
    # --------------------------------

    elif filename.lower().endswith(".docx"):

        docx_file = io.BytesIO(file_data)

        document = Document(docx_file)

        text = ""

        for paragraph in document.paragraphs:

            text += paragraph.text + "\n"


    # --------------------------------
    # Unsupported file
    # --------------------------------

    else:

        return {
            "success": False,
            "message": "Only PDF and DOCX files are supported."
        }


    # Remove unnecessary whitespace
    text = text.strip()


    return {

        "success": True,

        "filename": filename,

        "characters": len(text),

        "text": text

    }