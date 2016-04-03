var oldValue="";
alert("Hello");
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

        function updateEntry(){
            var newValue = document.getElementById('preconditionList').value;            
            var ssn = <?php echo $ssn; ?>;            

            $.ajax({
                type: "POST",
                url: 'pre-existing-condition/updatePreCondition.php',
                data: { ssn: ssn, oldValue: oldValue, newValue: newValue},
                success: function(data){
                    document.getElementById('bottomLabel').textContent = data;
                },
                error: function(data){                    
                    document.getElementById('bottomLabel').textContent = data;
                }  
            });            
        }


        function deleteEntry(deleteBtn){
            var selectedLabel = deleteBtn.parentNode.textContent.split("\n")[1].trim();
            if (confirm('Are you sure you want to delete this item?')) {
                var ssn = <?php echo $ssn; ?>;            
                $.ajax({
                    type: "POST",
                    url: 'pre-existing-condition/deletePreCondition.php',
                    data: { ssn: ssn, value: selectedLabel},
                    success: function(data){
                        alert(data);
                    },
                    error: function(data){                    
                        alert(data);
                    }  
                });
                location.reload();
            } else {
                // Do nothing!
            }
        }

        function addNewItem(addNewItem){
            document.getElementById('light').style.display='block';
            document.getElementById('fade').style.display='block';
                      
            document.getElementById('btnSave').textContent='Add';
            document.getElementById('btnSave').onclick = function(){ addEntry(document.getElementById('btnSave')); };
        }

        function addEntry(addBtn){            
            var newValue = document.getElementById('preconditionList').value;            
            var ssn = <?php echo $ssn; ?>;            

            $.ajax({
                type: "POST",
                url: 'pre-existing-condition/addPreCondition.php',
                data: { ssn: ssn, newValue: newValue},
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
