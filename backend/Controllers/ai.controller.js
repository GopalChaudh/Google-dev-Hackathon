import OpenAI from "openai";

const openai = new OpenAI();

async function fetchResponse(query) {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: query }],
        model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);
    return completion.choices[0];
}

export const getResponse = async (req, res) => {
    console.log("req: ", req.body);
    try {
        const query = "You are an agricultural expert! You are here to help farmers with their queries. My prompt is: "+req.body.prompt;
        const response = await fetchResponse(query);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}