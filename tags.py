from openai import OpenAI

OPENAI_API_KEY="sk-proj-R4cjN2trf5PecI7IeuyuT3BlbkFJFPUtfnHJhHjiUlMSUMWF"

client = OpenAI(api_key = OPENAI_API_KEY)

completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": """You are a linguistic expert assistant, skilled in understanding different languages, their nuances and you also understand a mix of languages such as Hinglish. 
I'll give you some dialogue conversations. Your task is to analyze and understand them to classify each dialogue statement into one fo the corresponding 4 tags: 
question, response to a question, statement, or an instruction. The dialog conversations are such that a response for a question posed can come after many statements too. 
It is like a natural, group conversation where any user can reply to any message that was sent any time in the past. Based on this information, classify the tags of the 
entire dialogue sequence. Write the classified tag first, and then reason it in a maximum of 100 words. 
The format should be strictly as follows: <sentence_id>: <Classification>. <Reason For Classification>

Example -
Context-:
07/05/2020, 17:24 - +91 99999 99999: Hello kya mai puch skti hun aap log kya kar rhe ho?
07/05/2020, 17:25 - +91 99999 99999: Hum log carrom khelne jaa rhe they ki tum aagayi. Welcome friend!
07/05/2020, 17:25 - +91 99999 99999: Han, tum bhi aao maza aayega. 
07/05/2020, 17:25 - +91 99999 99999: Tum sab dhyaan se sunna baaki logon ko.

Expected Answer-: 
07/05/2020, 17:24 - +91 99999 99999: Question. The user wants to know that what are other people doing?
07/05/2020, 17:25 - +91 99999 99999: Response to a question. The user is inviting the person who asked what are other people doing for a game of carrom.
07/05/2020, 17:25 - +91 99999 99999: Statement. The user is trying to persuade the person who asked the question to come for a game of carrom.
07/05/2020, 17:25 - +91 99999 99999: Instruction. The user is instructing everyone to listen to other people very attentively.
"""},
    {"role": "user", "content": """07/05/2020, 14:15 - +91 99999 99999: Aaj ki yeah audio sab jarur sune, dekhne main aa raha hai ki hamare group members paet ki dard ko lekar kaffi nervous hain, apko pehle bhi batata gaya hai ki pregnancy main chotti motti dard hoti rehti hai, isko lekar presha  na hoan, aap aaj bheji gai audio sune aur aap khud samajh sakenge ki apki dard normal hai ya delivery ki dard hain, pls aap isse jarur sune
07/05/2020, 14:15 - +91 99999 99999: This message was deleted
07/05/2020, 17:24 - +91 99999 99999: Hello mam mere tumy pain hota hai kbi kbi.... Aj subha se pain hora  hai
07/05/2020, 17:25 - +91 99999 99999: Nhi
07/05/2020, 17:54 - +91 99999 99999: Pregnancy me asa hota h ye chote motte drd common hote h ap inko face krnaa sikhooo agr bht jydaa h to ap btaoo panii jydaa pioo rest kro relax kro khush rhoo ache se khaoo khana
07/05/2020, 19:14 - +91 99999 99999: Ok g
07/05/2020, 23:51 - Dr. Vijay: पेट में बच्चा है जो दिन प्रतिदिन बढ़ता है उसके चारों तरफ पानी और ऑल भी बढ़ती है
       इन वजह से आपका पेट टाइट फील करता है
08/05/2020, 06:37 - +91 99999 99999: Gud morning everyone 🤗🤗have a nice day
"""}
  ]
)

print(completion.choices[0].message)
