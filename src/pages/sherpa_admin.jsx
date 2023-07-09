import React, { useEffect, useState } from "react";
import supabase   from "../../src/components/auth/supabaseDeets.js"
// import { supabase } from "../supabaseClient.js";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl,{ useFormControl } from '@mui/material/FormControl';
import Button from '@mui/material/Button';


function MyFormHelperText() {
  const { focused } = useFormControl() || {};

  const helperText = React.useMemo(() => {
    if (focused) {
      return 'This field is being focused';
    }

    return 'Topic';
  }, [focused]);

  return <FormHelperText>{helperText}</FormHelperText>;
}
const Sherpa_admin = () => {
  const [users, setUsers] = useState([]);

  const[topic,setTopic]=useState({
    topic_string :''
  })

  console.log(topic)

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    let { data, error } = await supabase
      .from("user_details")
      .select("first_name")
      setUsers(data)
    console.log(users)


   
  }
  if (users.length ===0) 
  return(null)

  // function handleChange(e){
  //   setTopic(prevFormData =>{
  //     return{
  //       ...prevFormData,
  //       [e.target.topic]:e.target.value
  //     }
  //   })
    

    
      
  // }
  function handleChange(e) {
    const { name, value } = e.target;
    setTopic((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  }
  
  async function createTopic() {
    event.preventDefault();

await supabase
  .from('topics')
  .insert(
    { topic_string: topic.topic_string},
  )
  }


  return (<h1> Welcome {users [0].first_name} 
  {/* <div>
      Active Users: {activeUsers.join(', ')}
    </div> */}
  <Box component="form" noValidate autoComplete="off" name = 'topic_string'onSubmit={createTopic}>
      <FormControl sx={{ width: '25ch' }} >
        <OutlinedInput name = 'topic_string'placeholder="Please enter the topic title"
        onChange={handleChange} />
        <MyFormHelperText />
      </FormControl>
      <Button variant="outlined" type = 'submit'>Submit</Button>
    </Box>
</h1> )
}
//topic key you use it with the map fxn could be needed above ref part 4 of videos

export default Sherpa_admin;
