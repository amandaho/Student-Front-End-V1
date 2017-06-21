/**
 * Use the jQuery Validate and the bootstrap-select plugin to enhance this page
 *
 * Here's what this you will need to do:
 *
 * 1. When the page is loaded all form fields should be disabled except
 *    for the dropdown to select a student ++
 *
 * 2. Using the bootstrap-selct plugin render dropdown on the page++
 *
 * 3. Use the live search functionality to make the dropdown searchable ++
 *
 * 4. Add the user glyphicons next to each student in the list ++
 *
 * 6. Add a menu header to the dropdown ++
 *
 * 7. Customize further with anything you find intersting
 *
 * 8. When an student is selected the form fields should be enabled
      and populated with the data for the selected student
 *
 * 9. Use jQuery validate and add validation to the form with the following++ requirements
 *    First Name - required, at least 2 characters
 *    Last Name  - required, at least 2 characters
 *	  start_date - make sure date is yyyy-mm-dd
 *	  ADD any other validation that makes you happy
 *
 * 10. Make the color of the error text red
 *
 *
 *
 * Here's the documentation you need:
 * https://jqueryvalidation.org/validate/
 * https://jqueryvalidation.org/documentation/#link-list-of-built-in-validation-methods
 * https://silviomoreto.github.io/bootstrap-select/
 * https://silviomoreto.github.io/bootstrap-select/examples/
 * http://getbootstrap.com/components/#glyphicons
 * https://api.jquery.com/jQuery.get/
 * http://stackoverflow.com/questions/9807426/use-jquery-to-re-populate-form-with-json-data
 *
 */

 (function(){

   $(function(){
      //variables
      let firstName = $('#first_name')
      let lastName = $('#last_name')
      let startDate = $('#start_date')
      let gpa = $('#gpa')
      let sat = $('#sat')
      let majorId = $('#major_id')
      let studentID = $('#student_id')

    //code goes here

    //disable content fields
    function disableContent() {
      $("#updateStudentForm :input").prop("disabled", true);
    }
    disableContent();

    //enables content fields
    function enableContent() {
      $("#studentId").change(function() {
         $("#updateStudentForm :input").prop("disabled", false);
      });
   }
   enableContent();

      //populates data
      $("#studentId").change(function() {
         var idClick = $(this).val()
         console.log(idClick);

         var url = ("http://localhost:1337/student" + "/" + idClick);
         console.log(url)

         $.get(url, function(data) {
           firstName.val(data.first_name);
           lastName.val(data.last_name);
           startDate.val(data.start_date);
           gpa.val(data.gpa);
           sat.val(data.sat);
           majorId.val(data.major_id);
           studentID.val(data.student_id);

         });

      });

   //validations
    function validations() {
      $("#updateStudentForm").validate({
        errorClass: "text-danger",
        rules: {
          first_name: {
            required: true,
            minlength: 2
          },

          last_name: {
            required: true,
            minlength: 2
          },

          start_date: {
            dateISO: true
          }
        },

        messages: {
          first_name: {
             required: "Please specify a first name!",
             minlength: "Please specify your first name with at least two characters!"
          },
          last_name: {
            required: "Please specify a last name!",
            minlength: "Please specify your last name with at least two characters!"
          }

        }

      });

    }

    validations();

  })

 })();
