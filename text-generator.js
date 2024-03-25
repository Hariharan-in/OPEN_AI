import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are here to give Emojis to us",
      },
      
      {role:"user",content:"Smiley"}
    ],
    
    model:"gpt-3.5-turbo",
    temperature:.5,
    max_tokens:64,
    top_p:1,
    response_format:{type:"text"}
  });
  console.log(completion.choices[0].message.content);
}


main();