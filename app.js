//first step (browser shows calls the function to load data )


window.onload = async function()
 {
  await loadApplications();
};



//Second step : function 1 (fetch the data from the server as in json format )
// converts the json into real data (now the real is in (data))

async function loadApplications() 
{
  let response = await fetch('get.php');   // ask the server for data
  let data = await response.json();        // wait for ans - turn to js 
  displayTable(data);
  updateStats(data);
}


// third step : function 2 diplays the (data) in a table format 
//and keep on updates 

function displaytable(data)
{
    let tbody = document.getElementById('tablebody');
    tbody.innerHTML = '';

for (let i = 0; i<data.length; i++)
{
    let row= data[i];
    let rowhtml = '<tr>' + 
    '<td>' + row.company + '</td>' +
    '<td>' + row.position + '</td>'+
    '<td>' + row.location + '</td>' + 
     '<td><span class="badge ' + row.status + '">' + row.status + '</span></td>' +
        '<td>' + row.date + '</td>' +
        '<td>' +
          '<button class="btn-edit" onclick="editApplication(' + row.id + ')">Edit</button>' +
          '<button class="btn-delete" onclick="deleteApplication(' + row.id + ')">Delete</button>' +
        '</td>' +
      '</tr>';
 
    tbody.innerHTML += rowHTML; 
  }
}

//Fourth Step : Function 3 counts the status (initially its 0 now)
// counts and updates the status card 

function updatestatus(data)
{
    let total=0;
    let applied = 0;
    let interview = 0;
    let offered = 0;
    let rejected = 0;


    for (let i =0 ; i<data.length; i++)
    {
        total++;

        if (data[i].status === 'Applied')
        {
            applied++;
        }
        else if (data[i].status==='Interview')
        {
            interview++;
        }
        else if (data[i].status==='Offered')
        {
            offered++;
        }
        else if(data[i].status==='Rejected')
        {
            rejected++;
        }

        document.getElementById('total').innerText = total;
        document.getElementById('total').innerText = total;
        document.getElementById('applied').innerText = applied;
        document.getElementById('interview').innerText = interview;
        document.getElementById('offered').innerText = offered;
        document.getElementById('rejected').innerText = rejected;
        
    }
}


//Fifth step : function 4 adds or enters application or user inputs  
// if the input box is empty - alerts the user to enter the inputs 
// gets the input from user - sends to server in a post method



async function saveApplication() 
{
  let id = document.getElementById('editId').value;

  let company  = document.getElementById('company').value;
  let position = document.getElementById('position').value;
  let location = document.getElementById('location').value;
  let status   = document.getElementById('status').value;
  let date     = document.getElementById('date').value;

  if (company === '' || position === '' || location === '' || date === '')
    {
    alert('Please fill all fields!');
    return;
    }
  
 let response = await fetch('save.php', 
    {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, company, position, location, status, date })
  });
 
  let data = await response.json();
 
  alert(data.message);
  clearForm();
  await loadApplications();
}

//Sixth Step : Function 5 delets an application( by its id)
//sends the id to server to delete it from the server 

function deleteApplication(id) 
{
  let sure = confirm('Are you sure you want to delete?');
  if (!sure) 
    {
    return;
  }

  let response = await fetch('delete.php', 
    {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  });
 
  let data = await response.json();
 
  alert(data.message);
  await loadApplications();
}
 
  
//Seventh step : function 6 edits the application (by its id)

async function editApplication(id) 
{
  let response = await fetch('get.php');
  let data = await response.json();
 
  let row = null;
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      row = data[i];
    }
  }

      document.getElementById('company').value  = row.company;
      document.getElementById('position').value = row.position;
      document.getElementById('location').value = row.location;
      document.getElementById('status').value   = row.status;
      document.getElementById('date').value     = row.date;
      
      document.querySelector('.form-box button').innerText = 'Update';

}


//Eight step : Function 7 Resets the form (after add / delete / updations)

function clearForm() 
{
  document.getElementById('company').value  = '';
  document.getElementById('position').value = '';
  document.getElementById('location').value = '';
  document.getElementById('status').value   = 'Applied';
  document.getElementById('date').value     = '';

  document.querySelector('.form-box button').innerText = 'Add';
}