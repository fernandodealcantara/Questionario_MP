// import  mongoose  from "mongoose"
import quizModel from "../models/quizModels.js"
import ResponseModel from "../models/responseModels.js"

export const findQuiz = async (req, res) => {
    const { id } = req.params;

    try {
        const quiz = await quizModel.find({ _id: id}).exec()
        console.log(quiz)
        res.status(200).json(quiz)
    } catch(error) {
        res.status(404).json({ERRO: 'Esse questionario nao existe.'})
    }

}

export const replyQuiz = async (req, res) => {
    const ResponseData = req.body
   
    const newResponse = new ResponseModel({...ResponseData, createdAt: new Date().toISOString() })

    try {
        await newResponse.save()
        res.status(201).json(newResponse)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const findAllQuizResponses = async (req, res) => {
    const { id } = req.params
    console.log({quiz: id});
    try {
        const answers = await ResponseModel.find({quiz: id}).exec()
        res.status(200).json(answers)
    } catch (error) {
        res.status(404).json({ERRO: 'Nao ha respostas!'})
    }
};

export const findAllUserResponses = async (req, res) => {
    const id = req.userId

    try {
        const answers = await ResponseModel.find({answeredBy: id}).exec()
        res.status(200).json(answers)
    } catch (error) {
        res.status(404).json({ERRO: 'Nao ha respostas!'})
    }
}

export const findAllCreatorQuizzes = async (req, res) => {
    const id = req.userId

    try {
        const Quizzes = await quizModel.find({creator: id}).exec()
        res.status(200).json(Quizzes)
    } catch(error) {
        res.status(404).json({ERRO: 'Nao ha questionarios!'})
    }

}

export const findAllQuizzes = async (req, res) => {
    try {
        const Quizzes = await quizModel.find().exec()

        res.status(200).json(Quizzes)
    } catch(error) {
        res.status(404).json({ERRO: 'Nao ha questionarios!'})
    }

}

export const createQuiz = async (req, res) => {
    const QuizData = req.body
    const newQuiz = new quizModel({...QuizData, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newQuiz.save()

        res.status(201).json(newQuiz)
    } catch(error) {
        res.status(409).json({message: error.message})
    }

}

/* export const updateQuiz = async (req, res) => {
    const {id} = req.params

    const { Quizname, name, password} = req.body
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`Nao ha nenhum usuario com esse id`)
    }

    let updatedData = {}
    if(Quizname != null)
        updatedData['Quizname'] = Quizname
    if(name != null)
        updatedData['name'] = name
    if(password != null)
        updatedData['password'] = password

    updatedData[id] == id
    

    await quizModel.findByIdAndUpdate(id,updatedData, {new: true})

    res.json(updatedData)
    console.log('USUARIO ATUALIZADO')
}

export const deleteQuiz = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`Nao ha nenhum usuario com esse id`)
    }
    
    await quizModel.findByIdAndRemove(id)

    res.json({message: `O usuario com id ${id} foi deleteado`})

} */