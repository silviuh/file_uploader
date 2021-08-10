const fileUploader = document.getElementById('file-uploader');
const feedback = document.getElementById('feedback');
const progress = document.getElementById('progress');

/*
function getLanguage(){
  const romanian = document.getElementById('german_checkbox');
  const german = document.getElementById('romanian_checkbox');
  const japanese = document.getElementById('japanese_checkbox');
  const french = document.getElementById('french_checkbox');
  const korean = document.getElementById('korean_checkbox');
  const nl = document.getElementById('netherland_checkbox');
  const zh = document.getElementById('_checkbox');
  const czech = document.getElementById('czech_checkbox');
  const po = document.getElementById('po_checkbox');
  const spanish = document.getElementById('spanish_checkbox');
  const italian = document.getElementById('italian_checkbox');

  if(romanian.value == "on")
}
*/

function getSelectedCheckboxValues(name) {
  const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
  let values = [];
  checkboxes.forEach((checkbox) => {
    values.push(checkbox.value);
  });
  return values;
}

function getCertificate(){
    const certificateResponseElem = document.getElementById('certificate_yes');
    return certificateResponseElem.checked;
}

const reader = new FileReader();

fileUploader.addEventListener('change', async (event) => {
  const files = event.target.files;
  const file = files[0];
  const size = file.size;

  reader.readAsDataURL(file);

  let msg = '';
  if (size > 1024 * 1024) {
    msg = `<span style="color:red;">The allowed file size is 1MB. The file you are trying to upload is of ${returnFileSize(size)}</span>`;
    feedback.innerHTML = msg;
  } else {
    msg = `<span style="color:green;"> A ${returnFileSize(size)} file has been uploaded successfully. </span>`;
    feedback.innerHTML = msg;

    reader.addEventListener('progress', (event) => {
      if (event.loaded && event.total) {
        const percent = (event.loaded / event.total) * 100;
        progress.value = percent;
        document.getElementById('progress-label').innerHTML = Math.round(percent) + '%';

        if (percent === 100) {
          let msg = `<br><span style="color:green;">File <u><b>${file.name}</b></u> has been uploaded successfully.</span>`;
          feedback.innerHTML = msg;
        }
      }
    });

    let formData = new FormData();
    formData.append("file", files[0]);
    const courseName = document.getElementById("course_name").value;
    const course_description = document.getElementById("course_description").value;
    const language = getSelectedCheckboxValues('lang_checkbox');
    const duration = document.getElementById("duration").value;
    const certificate = getCertificate();

    /*
    let response = await fetch('/upload', {
      method: "POST",
      body:
        JSON.stringify({
          courseName : courseName,
          description: course_description,
          language: language,
          duration: duration,
          certificate: certificate,
          content: formData
        })
    });
     */

    /*
    formData.append("content", files[0]);
    formData.append("courseName", courseName);
    formData.append("description", course_description);
    formData.append("language", JSON.stringify(language));
    formData.append("duration", duration);
    formData.append("certificate", certificate);

     let response = await fetch('/upload', {
       method: "POST",
       body: formData
     });
 */
    let response = await fetch('/upload', {
      method: "POST",
      body:
        JSON.stringify({
          courseName : courseName,
          description: course_description,
          language: language,
          duration: duration,
          certificate: certificate,
          content: formData
        })
    });

    if (response.status == 200) {
      alert("File successfully uploaded.");
    } else {
      alert("File could not be uploaded.");
    }
  }
});

async function uploadFile() {
  let formData = new FormData();
  formData.append("file", fileupload.files[0]);
  let response = await fetch('/upload', {
    method: "POST",
    body: formData
  });

  if (response.status == 200) {
    alert("File successfully uploaded.");
  }
}

function returnFileSize(number) {
  if (number < 1024) {
    return number + 'bytes';
  } else if (number >= 1024 && number < 1048576) {
    return (number / 1024).toFixed(2) + 'KB';
  } else if (number >= 1048576) {
    return (number / 1048576).toFixed(2) + 'MB';
  }
}

