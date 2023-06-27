export default function AuthHandler(req, res){
  if (req.method !== "POST"){
    res.status(405).send({ message: 'Only POST requests allowed' })
    return;
  }

  console.log("received auth req: ", req.body.username)

  // create new user on backend with cognito and log into database

  res.status(200).send({ message: 'Auth completed' })
}