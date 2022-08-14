export const generalConfig = {
    storage: {
        'USER': 'user',
        'USERNAME': 'username',
        'USERTYPE': 'usertype',
        'PROFILE_PIC': 'profilepic',
        'TOKEN': 'token',
        'ID': 'id',
        'USERFNAME': 'userfname',
        'USERLNAME': 'userlname',
        'All': 'all',
        'PERMISSION': 'PERMISSION'
    },
   
    pattern: {

        // 'NAME': /^[a-zA-Z,.'\-\,]+$/,
        // "CITY": /^[a-zA-Z . \-\']*$/,
        // "POSTAL_CODE": /^[0-9A-Z]{4}/, // /^\d{5}-\d{4}|\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d$/,
        // "PHONE_NO": /^\(?(?:\+?61|0)(?:(?:2\)?[ -]?(?:3[ -]?[38]|[46-9][ -]?[0-9]|5[ -]?[0-35-9])|3\)?(?:4[ -]?[0-57-9]|[57-9][ -]?[0-9]|6[ -]?[1-67])|7\)?[ -]?(?:[2-4][ -]?[0-9]|5[ -]?[2-7]|7[ -]?6)|8\)?[ -]?(?:5[ -]?[1-4]|6[ -]?[0-8]|[7-9][ -]?[0-9]))(?:[ -]?[0-9]){6}|4\)?[ -]?(?:(?:[01][ -]?[0-9]|2[ -]?[0-57-9]|3[ -]?[1-9]|4[ -]?[7-9]|5[ -]?[018])[ -]?[0-9]|3[ -]?0[ -]?[0-5])(?:[ -]?[0-9]){5})$/,
        // "MOB_NO": /^\(?(?:\+?61|0)(?:(?:2\)?[ -]?(?:3[ -]?[38]|[46-9][ -]?[0-9]|5[ -]?[0-35-9])|3\)?(?:4[ -]?[0-57-9]|[57-9][ -]?[0-9]|6[ -]?[1-67])|7\)?[ -]?(?:[2-4][ -]?[0-9]|5[ -]?[2-7]|7[ -]?6)|8\)?[ -]?(?:5[ -]?[1-4]|6[ -]?[0-8]|[7-9][ -]?[0-9]))(?:[ -]?[0-9]){6}|4\)?[ -]?(?:(?:[01][ -]?[0-9]|2[ -]?[0-57-9]|3[ -]?[1-9]|4[ -]?[7-9]|5[ -]?[018])[ -]?[0-9]|3[ -]?0[ -]?[0-5])(?:[ -]?[0-9]){5})$/,

        /* "PHONE_NO" : /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/  - for 10-12 valid digits */

        'NAME': /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
        'CLAIMNUMBER': /^[ A-Za-z0-9]*$/,
        'REPORTNAME': /^[ A-Za-z]*$/,
        'CODE': /^[ A-Za-z_@./#&+-/'/"]*$/,
        'DURATION': /^[0-9]{0,3}$/,
        'PRICING': /^[0-9.]{0,30}$/,        
        "CITY": /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/,
        "EMAIL": /^(([^<>()\[\]\\.,,:\s@"]+(\.[^<>()\[\]\\.,,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "POSTAL_CODE": /^\d{5}-\d{4}|\d{4}|[A-Z]\d[A-Z] \d[A-Z]\d$/,
        "PHONE_NO": /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,4}$/,
        "FIRM_NUMBER": /^[a-z0-9\-]+$/,
        "ALPHANUM":/^[a-zA-Z0-9]+$/,
        "MOB_NO": /\(?\d{3}\)?-? *\d{3}-? *-?\d{4}/,
        "PASSWORD": /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$#!%*?&])[A-Za-z\d$@$!%*?&#]{6,}/,
        "DESCRIPTION": /^[ !@#$%^&*()~:;{}?'"=<>A-Za-z0-9_@./#&+-,-]*$/,
        "REFNO": /^[ 0-9_@./#&+-,-]*$/,
        "TASK_CODE": /^[0-9999]{1,4}$/,
        "SUB_DOMAIN": /^[/a-z/A-Z][a-zA-Z0-9-]*[^/-/./0-9]$/,
        "PHONE_NO_MASK": ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        "IVR_ACTION_KEY": /^[0-9]*$/,
        "IVR_NUMBER": /^[0-9]*$/,
        "RADIUS": /^[0-9]*(?:.)([0-9])+$/,
        "LATLONG": /^\s*(\-?\d+(\.\d+)?)$/,
        "SSN": /^((\d{3}-?\d{2}-?\d{4})|(X{3}-?X{2}-?X{4}))$/,
        "SSN_MASK": [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        "PRACTICE_PASSWORD": /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
        "USERNAME": /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){1,14}[a-zA-Z0-9]$/,
        "USERNAME_MIN_SIZ": /^[a-zA-Z0-9_](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9_]){4,18}[a-zA-Z0-9_]$/,
        "WICARE_USERNAME": /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{1,}/,
        "YEAR_MASK": /d{4}/,
        "DECIMAL": /\d+(\.\d{1,2})?/,
        "MAXLENGTH": 50,
        "MINLENGTH": 3,
        "PASSWORDMINLENGTH": 6,
        "PASSWORDMAXLENGTH":15
    },

    paginator: {
        COUNT: 10,
        PAGE: 1
    },

    rolename: {
        'COMPANY': "COMPANY",
        'DRIVER': "DRIVER",     
        'ATTENDEE' : "ATTENDEE",
        'USER': "USER"
        // "COMPANY":"COMPANY",
        // "MARKETING":"MARKETING",
        // "INVITED":"INVITED",
        // "EXISTINGCUSTOMER":"EXISTINGCUSTOMER",
        // "FINANCE":"FINANCE",
        // "CANVASSING":"CANVASSING",
        // "SCOUTING":"SCOUTING",
        // "SALES":"SALES",
        // "SALESPERSON":"SALESPERSON",
        // "ADMINISTRATOR":"ADMINISTRATOR"
    },

    
    statusCode: {
        "ok": 200,
        "unauth": 401,
        "warning": 404,
        "validation": 400,
        "failed": 1002,
        "invalidURL": 1001,
        "paymentReq": 402,
        "internalError": 1004,
        "forbidden": 403,
        "internalservererror": 500,
        "alreadyExist": 409, //conflict
        "Completed": "Completed",
        "Cancelled": "Cancelled"
    },

    'marker_category' : [
        {optimg:'not-status.png', value:'SCOUTING',name:'Scouting' },
        {optimg:'not-status.png', value:'SALES',name:'Sales'},
        {optimg:'not-status.png', value:'EXISTINGCUSTOMER',name:'Existing Customer'},
        {optimg:'not-status.png', value:'CANVASSING',name:'Canvassing'}
    ],
    'marker_icon':[
        {
            'scouting':[
                {id:1, name:'No status', 'icon_img':'not-status.png'},
                {id:2, name:'Not Severe','icon_img':'not-severe.png'},
                {id:3, name:'Slightly Severe','icon_img':'severe.png'},
                {id:4, name:'Severer','icon_img':'severe.png'},
                {id:5, name:'Very severer','icon_img':'severe.png'},
                {id:6, name:'Major damage','icon_img':'major-damage.png'},
            ]
        },
        {
            'sales':[
                {id:1, name:'Outbound Lead','icon_img':'outbond-lead.png'},
                {id:2, name:'In Lead','icon_img':'inbond-lead.png'},
            ]
        },
        {
            'existing_customer':[
                {id:1, name:'Monitoring','icon_img':'montring.png'},
                {id:2, name:'Warranty','icon_img':'warrenty.png'},
                {id:3, name:'Appraiser','icon_img':'appraiser.png'}
            ]
        },
        {
            'canvassing':[
                {id:1, name:'Pull contract Data','icon_img':'pull.png'},
                {id:2, name:'No answer','icon_img':'pull.png'},
                {id:3, name:'Not intrested','icon_img':'not-intersted.png'}
            ]
        },
    ],
   
       
    gender: [
        {gender: 'Male'},
        {gender: 'Female'},
        {gender: 'Other'},
    ],

   maritalStatus: [
        {maritalStatus: 'Married'},
        {maritalStatus: 'Single'},
        {maritalStatus: 'Divorced'},        
        {maritalStatus: 'Widow'},
        {maritalStatus: 'Widower'},
        {maritalStatus: 'In-Relationship'},
    ],

    experience: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],

    skills: [
       {skills: 'Driving'},
       {skills: 'Drifting',}
    ],

    language: [

        {language: 'English'},
        {language: 'Punjabi'},
        {language: 'Spanish'},
        {language: 'French'},
    ],

    designation:  [

        {designation: 'Driver'},
        {designation: 'Supervisor'},
        {designation: 'Conductor'},
    ],

    religion:  [

        {religion: 'Hinduism'},
        {religion: 'Islam'},
        {religion: 'Sikhism'},
        {religion: 'Jainism'},
        {religion: 'Buddhism'},
        {religion: 'Christianity'},
    ],

    services:  [
        {services: 'Agriculture & Forestry/Wildlife'},
        {services: 'Business & Information'},
        {services: 'Construction/Utilities/Contracting'},
        {services: 'Education'},
        {services: 'Finance & Insurance'},
        {services: 'Food & Hospitality'},
        {services: 'Gaming'},
        {services: 'Health services'},
        {services: 'Motor Vehicle'},
        {services: 'Natural Resources/Environmental'},
        {services: 'Personal services'},
        {services: 'Real Estate & Housing'},
        {services: 'Safety/Security & Legal'},
        {services: 'Transportation'},
     
    ],

    passwordCreatedmessage: 'Password created sucessfully',
    
}