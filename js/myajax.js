$(document).ready(function() {
    // Handle form submission
    $('#insert_form').on('submit', function(e) {
        e.preventDefault();
        
        let formData = $(this).serialize();
        let url = $(this).attr('data-id') ? 'update.php' : 'insert.php'; // Use update.php if data-id is present

        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            success: function(response) {
                $('#status_message').removeClass('alert-danger').addClass('alert-success').html(response).show();
                $('#insert_form')[0].reset(); // Reset form fields
                $('#insert_form').removeAttr('data-id'); // Remove data-id after successful submission
                loadData(); // Reload data in the table
            },
            error: function() {
                $('#status_message').removeClass('alert-success').addClass('alert-danger').html('Failed to submit data!').show();
            }
        });
    });

    // Function to load data in the table
    function loadData() {
        $.ajax({
            url: 'fetch.php',
            type: 'GET',
            success: function(response) {
                $('#user_table').html(response);
            }
        });
    }

    // Handle edit button click
    $(document).on('click', '.btn-edit', function() {
        let id = $(this).data('id');
        
        $.ajax({
            url: 'get_single_record.php',
            type: 'GET',
            data: { id: id },
            success: function(response) {
                let data = JSON.parse(response);
                $('#name').val(data.name);
                $('#email').val(data.email);
                $('#password').val(data.password);
                $('#insert_form').attr('data-id', data.id); // Store the id in the form for updating
            }
        });
    });

    // Handle delete button click
    $(document).on('click', '.btn-delete', function() {
        let id = $(this).data('id');
        
        if (confirm('Are you sure you want to delete this record?')) {
            $.ajax({
                url: 'delete.php',
                type: 'POST',
                data: { id: id },
                success: function(response) {
                    $('#status_message').removeClass('alert-danger').addClass('alert-success').html('Record deleted successfully!').show();
                    loadData(); // Reload data in the table
                },
                error: function() {
                    $('#status_message').removeClass('alert-success').addClass('alert-danger').html('Failed to delete record!').show();
                }
            });
        }
    });

    // Initial load of data
    loadData();
});
