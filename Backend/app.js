import express from "express"
import fs from "fs"
import cors from "cors"
import { v4 as uuidv4 } from 'uuid';


const app = express()
const PORT = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())



app.post("/createuser", (request, response) => {
    const body = { ...request.body, id: uuidv4() }
    const fileExist = fs.existsSync("users.txt")

    if (fileExist) {
        const getUsers = fs.readFileSync("users.txt", "utf-8")
        const parseUsers = JSON.parse(getUsers)

        const emailExist = parseUsers.find((user) => user.email == body.email)

        if (emailExist) {
            return response.json({
                message: "User Already Exists"
            })
        }

        parseUsers.push(body)
        fs.writeFileSync("users.txt", JSON.stringify(parseUsers))
        response.json({
            message: "User Created Successfully"
        })

    } else {
        const arr = []
        arr.push(body)
        fs.writeFileSync("users.txt", JSON.stringify(arr))
        response.json({
            message: "User Created in File System"
        })
    }



})


app.get("/getAllUsers", (request, response) => {

    const getAllUsers = JSON.parse(fs.readFileSync("users.txt", "utf-8"))
    // console.log(getAllUsers);
    
    response.json({
        messsage: "Get All Users Data Successfully",
        data: getAllUsers
    })

})


app.listen(PORT, () => console.log(`Server Running on localHost${PORT}`))
