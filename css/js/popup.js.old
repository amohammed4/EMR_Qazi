var oldValue="";

        function popUpDiv(editBtn){
            document.getElementById('light').style.display='block';
            document.getElementById('fade').style.display='block';
            
            var selectedLabel = editBtn.parentNode.textContent.split("\n")[1].trim();
            oldValue = selectedLabel;

            var dd = document.getElementById('preconditionList');
            for (var i = 0; i < dd.options.length; i++) {
                if (dd.options[i].text === selectedLabel) {
                    dd.selectedIndex = i;                    
                    break;
                }
            }
            //alert(selectedItem);
        }

        function updateTable(){
            var newValue = document.getElementById('preconditionList').value;            
            var ssn = <?php echo $ssn; ?>;            

            $.ajax({
                type: "POST",
                url: 'updatePreCondition.php',
                data: { ssn: ssn, oldValue: oldValue, newValue: newValue},
                success: function(data){
                    document.getElementById('bottomLabel').textContent = data;
                },
                error: function(data){                    
                    document.getElementById('bottomLabel').textContent = data;
                }  
            });            
        }

        function closePopUp(){
            document.getElementById('light').style.display='none';
            document.getElementById('fade').style.display='none';
            location.reload();
        }