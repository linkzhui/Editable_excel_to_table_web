function myFunction(event){

    var fileSelect = document.getElementById('myfile');

        event.preventDefault();

        statusDiv.innerHTML = 'Uploading.......';

        // Get the files from the input
        var files = fileSelect.files;

        // Create a new FormData object.
        var formData = new FormData();

        //Grab just one file, since we are not allowing multiple file uploads
        var file = files[0];



        if (file.size >= 5000000 ) {
            statusDiv.innerHTML = 'This file is larger than 5MB. Sorry, it cannot be uploaded.';
            return;
        }

        // Add the file to the request.
        formData.append('excel_file', file, file.name);

        // Set up the AJAX request.
        var xhr = new XMLHttpRequest();

        //response from the text
        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200)
            {
                statusDiv.innerHTML=this.responseText;
            }
        };
        // Open the connection.
        xhr.open('POST', '/', true);
        // Set up a handler for when the request finishes.
        xhr.onload = function () {
            if (xhr.status === 200) {
                statusDiv.innerHTML = 'The file uploaded successfully.......';
            } else {
                statusDiv.innerHTML = 'An error occurred while uploading the file. Try again';
            }
        };

        // Send the Data.
        xhr.send(formData);
        // xhr.onreadystatechange = function(){
        //     if(this.readyState == 4 && this.status == 200)
        //     {
        //         statusDiv.innerHTML=this.responseText+'this is hello world';
        //     }
        // }

};