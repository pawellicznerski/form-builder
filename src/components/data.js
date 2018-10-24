const data = [
    {
    id:232,
    type:'text',
    question:"first oner",
    conditionType:'',
    conditionOption:'',
    conditionValue:'',
    subform:[
      {
        id:233,
        type:'radio',
        question:"second one",
        conditionType:'text',
        conditionOption:'Equals',
        conditionValue:'car',
        subform:[
          {
            id:239,
            type:'radio',
            question:"second one",
            conditionType:'radio',
            conditionOption:'Equals',
            conditionValue:'yes',
            subform:[]
          },{

          }
        ]
      }
    ]
    },{
    id:234,
    type:'text',
    question:"second one",
    condition:{type:'',option:'',value:''},
    subform:[]
    },
    {

    }
]

export default data;
