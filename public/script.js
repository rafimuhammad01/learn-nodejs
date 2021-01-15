$(function() {
    //GET REQUEST
    $.ajax({
        method: "GET",
        url: "https://to-do-api-rfm.herokuapp.com/v1/to-do",
        success : function(data) {
            $('#loading').hide();
            for (var i = 0; i < data.count; i ++) {
                $(".todo").append(`
                <div id=`+data.todolist[i]._id+` class="activity row align-items-center">
                    <div class=col-10>
                        <h3>`+data.todolist[i].activity+`</h3>
                        <p>`+data.todolist[i].detail+`</p>
                    </div>
                    <div class=col-1 >
                        <i class="update fa fa-edit" style="font-size: 20px;"></i>

                    </div>
                    <div class=col-1 >
                        <i class="delete fa fa-trash " style="font-size: 20px;"></i>
                    </div>
    
                </div>
                `)
            }
        }
    })

    //POST REQUEST
    $(".form-section").submit(function(e){
        e.preventDefault()

        const data = {
            "activity" : $("#activity").val(),
            "detail" : $("#detail").val()
        }
        

        $.ajax({
            url: "https://to-do-api-rfm.herokuapp.com/v1/to-do",
            method: "POST",
            data: data,
            success : function(data) {
                
                location.reload()
            },
            dataType: "json"
        })
        
        
    })
    //PATCH REQUEST
    $(".todo").on("click", ".update", function(){
        const id = $(this).closest(".row").attr("id")
        $.ajax({
            url : "https://to-do-api-rfm.herokuapp.com/v1/to-do/" + id,
            method : "GET",
            success : function(data){
                $("#" + id).after(
                    `
        
                <div class="form-`+ id +`" style="margin:auto; width:100%; margin-bottom:5%; margin-top:5%">
                    <form method="POST">
                        <div class="form-group">
                            <label for="activity">Activity</label>
                            <input type="text" class="form-control" id="activity-patch" value="`+ data.data.activity +`" required>
                        </div>
                        <div class="form-group">
                            <label for="detail">Detail (Optional)</label>
                            <input type="text" class="form-control" id="detail-patch" value="`+data.data.detail+`" >
                        </div>
        
                        <button type="submit" class="submit-button btn btn-primary shadow-none btn-outline-dark">Submit</button>
                        <button type="button" class="cancel-button btn btn-primary shadow-none btn-outline-dark">Cancel</button>
                    </form>
                            
                </div>
                
                
        
                    `
                )

                $("#" + id).hide()

            }
        })


        

        

        
        $(".todo").on("click", ".cancel-button", function(){
            $(".form-"+id).remove()
            $("#" + id).show()
            
        })


        $(".todo").on("submit", function(){
            
            const data = {
                "activity" : $("#activity-patch").val(),
                "detail" : $("#detail-patch").val()
            }

            $.ajax({
                url: "https://to-do-api-rfm.herokuapp.com/v1/to-do/" + id,
                method: "PATCH",
                data: data,
                success : function(res) {
                    
                    location.reload()
                },
                dataType: "json"
            })
            return false
            
        })
    })

    //DELETE REQUEST
    $(".todo").on("click", ".delete", function(){
        const id = $(this).closest(".row").attr("id")
        $.ajax({
            url: "https://to-do-api-rfm.herokuapp.com/v1/to-do/" + id,
            method: "DELETE",
            success : function(data) {
                location.reload()
            }
        })
    })



    //OTHER FUNCTIONALITY
    $(".add-activity").click(function() {
        $(".form-section").append(`
        <form action="" method="POST">
            <div class="form-group">
                <label for="activity">Activity</label>
                <input type="text" class="form-control" id="activity" required>
            </div>
            <div class="form-group">
                <label for="detail">Detail (Optional)</label>
                <input type="text" class="form-control" id="detail">
            </div>

            <button type="submit" class="submit-button btn btn-primary shadow-none btn-outline-dark">Submit</button>
            <button type="button" class="close-button btn btn-primary shadow-none btn-outline-dark">Close</button>
        </form>

            `)

        $('.add-activity').hide();
    })

    $(".form-section").on('click', ".close-button",function() {
        $(".form-section").empty()
        $(".add-activity").show()
    })





});

    
    
