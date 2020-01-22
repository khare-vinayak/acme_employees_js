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
  
  function findEmployeeByName(name,employees){
    return employees.find(x=>{
            if(x.name===name){
            //    console.log(`{ id: ${x.id}, name: ${x.name}}`);
                return x;
            }
    });
  }

  function findManagerFor(employee,employees){
        return employees.find(x=>{
            if((x.id===employee.managerId)){
                return x;
            }
        });
    }
  
  function findCoworkersFor(employee,employees){
    let coworker=employees.filter(x=>{
        if(employee.managerId===x.managerId){
            return x;
        }
    });
    return coworker;
  }

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
  
  
  
  function generateManagementTree(employees){
    
    /*function reportingEmployee(employee,employees){
       let manager=findManagerFor(employee,employees);
      if(employee.managerId!==undefined && employee.managerId===manager.id){
        return employee;
      }
    }
    for (let i=0 ; i<employees.length;i++){
      console.log(reportingEmployee(employees[i],employees));
      //employees[i].reports.push(reportingEmployee(employees[i],employees));
    }
    console.log (employees);
  */

   let reports=[];
   for (let i=0;i<employees.length;i++){
    let manager=employees[i].managerId;
    let employee=employees.filter(element=>{
               if (element.id === manager){
                 return element;
               }
    });
    console.log(employee);
     }
  }
  /*function displayManagementTree(employees){
      
  }*/
  
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