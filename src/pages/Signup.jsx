import React from "react";
import {
  Box,
  Center,
  Link,
  Button,
  Card,
  Input,
  FormControl,
  FormLabel,
  CardHeader,
  CardBody,
  CardFooter,
  VStack,
  Select,
} from "@mui/material";
import { supabase } from "../supabaseClient";

const Signup = ( props ) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return <div>Signup</div>;
};

export default Signup;
