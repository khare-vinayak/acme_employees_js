const employees = [
    { id: 1, name: 'moe'},
    { id: 2, name: 'larry', managerId: 1},
    { id: 4, name: 'shep', managerId: 2},
    { id: 3, name: 'curly', managerId: 1},
    { id: 5, name: 'groucho', managerId: 3},
    { id: 6, name: 'harpo', managerId: 5},
    { id: 8, name: 'shep Jr.', managerId: 4},
    { id: 99, name: 'lucy', managerId: 1}
  ];
  
  const spacer = (text)=> {
    if(!text){
      return console.log('');
    }
    const stars = new Array(5).fill('*').join('');
    console.log(`${stars} ${text} ${stars}`);
  }
  //[pk] good job using "find". however, you are not quite using it optimally.
  //[pk] the arrow function passed in to "find" should return a boolean (true or false)
  //[pk] yours returns an employee (x). it just so happens that objects are truthy and
  //[pk] failing to return in a function returns undefined which is falsey, so your function
  //[pk] does produce the right result. but look at the solution for a much more concise approach!
  function findEmployeeByName(name,employees){
    return employees.find(x=>{
            if(x.name===name){
            //    console.log(`{ id: ${x.id}, name: ${x.name}}`);
                return x;
            }
    });
  }
  
  //[pk] same as above!
  //[pk] also another thing: try to make your variable names more semantic. so not "x". maybe "otherEmployee" or sthing
  function findManagerFor(employee,employees){
        return employees.find(x=>{
            if((x.id===employee.managerId)){
                return x;
            }
        });
    }
  
  //[pk] good use of filter here! but again same issue as above -- your arrow function should ideally return a boolean. see the solution.
  //[pk] also you forgot to exclude the employee themself -- add another condition so that employee!=x
  function findCoworkersFor(employee,employees){
    let coworker=employees.filter(x=>{
        if(employee.managerId===x.managerId){
            return x;
        }
    });
    return coworker;
  }

  //[pk] great! you should add some spacing to make the code more readable ("let x = y" not "let x=y", etc.)
  function findManagementChainForEmployee(employee,employees){
    let employeeChain=[];
    while(employee.managerId!=undefined){
        employee= findManagerFor(employee,employees);
        employeeChain.unshift(employee);
    }
    return employeeChain;
  
    // recursion
    //let employeeChain=[];
/*    if (employee.managerId=== undefined){
      return [];
    }
      let manager=findManagerFor(employee,employees);
      let employeeChain=findManagementChainForEmployee(manager,employees);
      return employeeChain.concat(manager);
*/
  }
  
  
  //[pk] nice helper function
  function reportingEmployee(employee,employees){
    let reportee=employees.filter(x=>employee.id=== x.managerId);
    employee.reports=reportee;
    employee.reports.forEach(x=>{
      //console.log(x.name);
      reportingEmployee(x,employees);
    });
  }
  
  //[pk] great! one issue here is that this mutates the incoming data. you generally want to avoid that.
  function generateManagementTree(employees){
   let root=employees.find(x=>x.managerId===undefined);
   console.log(root.name);
   reportingEmployee(root,employees);
  
  //console.log(root); 
  return root;  
}

//[pk] this is really good! 
function displayManagementTree(employee,count=0){
  console.log('-'.repeat(count).concat(employee.name));
  //[pk] this if condition doesn't really add anything! you could just take it out
  if (employee.reports === undefined  ){
    return;
  }
  else{
    employee.reports.forEach(x=>{
      displayManagementTree(x,count + 1);
    });
  
  } 
}
  spacer('findEmployeeByName Moe')
  // given a name and array of employees, return employee
  console.log(findEmployeeByName('moe', employees));//{ id: 1, name: 'moe' }
  spacer('')
  
  spacer('findManagerFor Shep')
  //given an employee and a list of employees, return the employee who is the manager
  console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees));//{ id: 4, name: 'shep', managerId: 2 }
  spacer('')
  
  spacer('findCoworkersFor Larry')
  
  //given an employee and a list of employees, return the employees who report to the same manager
  console.log(findCoworkersFor(findEmployeeByName('larry', employees), employees));/*
  [ { id: 3, name: 'curly', managerId: 1 },
    { id: 99, name: 'lucy', managerId: 1 } ]
  */
  
  spacer('');
  
  spacer('findManagementChain for moe')
  //given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager 
  console.log(findManagementChainForEmployee(findEmployeeByName('moe', employees), employees));//[  ]
  spacer('');
  
  spacer('findManagementChain for shep Jr.')
  console.log(findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees));/*
  [ { id: 1, name: 'moe' },
    { id: 2, name: 'larry', managerId: 1 },
    { id: 4, name: 'shep', managerId: 2 }]
  */
  spacer('');
  
  
  spacer('generateManagementTree')
  //given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.
  console.log(JSON.stringify(generateManagementTree(employees), null, 2));
  /*
  {
    "id": 1,
    "name": "moe",
    "reports": [
      {
        "id": 2,
        "name": "larry",
        "managerId": 1,
        "reports": [
          {
            "id": 4,
            "name": "shep",
            "managerId": 2,
            "reports": [
              {
                "id": 8,
                "name": "shep Jr.",
                "managerId": 4,
                "reports": []
              }
            ]
          }
        ]
      },
      {
        "id": 3,
        "name": "curly",
        "managerId": 1,
        "reports": [
          {
            "id": 5,
            "name": "groucho",
            "managerId": 3,
            "reports": [
              {
                "id": 6,
                "name": "harpo",
                "managerId": 5,
                "reports": []
              }
            ]
          }
        ]
      },
      {
        "id": 99,
        "name": "lucy",
        "managerId": 1,
        "reports": []
      }
    ]
  }
  */
  spacer('');
  
  spacer('displayManagementTree')
  //given a tree of employees, generate a display which displays the hierarchy
  displayManagementTree(generateManagementTree(employees));/*
  moe
  -larry
  --shep
  ---shep Jr.
  -curly
  --groucho
  ---harpo
  -lucy
  */
