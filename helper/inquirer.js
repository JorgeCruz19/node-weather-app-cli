const inquirer = require('inquirer')
require('colors')

const questions = [{
  type: 'list',
  name: 'opcion',
  message: '¿Qué desea hacer?',
  choices: [
    {
    value: 1,
    name: `${'1.'.green} Buscar ciudad`
    },
    {
    value: 2,
    name: `${'2.'.green} Historial`
    },
    {
    value: 0,
    name: `${'0.'.green} Salir`
    },
  ],
}]

const inquirerMenu = async () => {
  console.clear();
  console.log("===================".green);
  console.log("   Selecciona una opcion   ".green);
  console.log("===================\n".green);

  const {opcion} = await inquirer.prompt(questions)

  return opcion;
}

const pause = async () => {

  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Presion ${'enter'.green} para continuar`,
    },
  ];

  console.log('\n');
  await inquirer.prompt(question);

};

const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value){
        if(value.length === 0 ){
          return 'Por favor ingrese un valor';
        }
        return true;
      }
    }
  ]
  const { desc } = await inquirer.prompt(question);
  
  return desc;
}


const listPlaces = async (places = []) => {
  const choices = places.map( (place,i)=> {

    const idx = `${i + 1}`.green

    return {
      value: place.id,
      name: `${idx} ${place.name}`
    }
  });
  
  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancelar'
  })
  
  const questions = [
    {
      type:'list',
      name: 'id',
      message: 'Seleccione lugar: ',
      choices
    }
  ]

  const {id} = await inquirer.prompt(questions);

  return id;

}

  const confirm = async (message) => {
    const questions = [
      {
        type:'confirm',
        name: 'ok',
        message
      }
    ]
    const {ok} = await inquirer.prompt(questions);
    return ok;
  }

  const showCheckList = async (tasks = []) => {
    const choices = tasks.map( (task,i)=> {
  
      const idx = `${i + 1}`.green
  
      return {
        value: task.id,
        name: `${idx} ${task.desc}`,
        checked: (task.completedDate) ? true : false
      }
    });
  
    
    const question = [
      {
        type:'checkbox',
        name: 'ids',
        message: 'Seleccione',
        choices
      }
    ]
  
    const {ids} = await inquirer.prompt(question);
  
    return ids;
  
  }
module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listPlaces,
  confirm,
  showCheckList
}