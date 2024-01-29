import {useEffect} from "react";
import styles from "./Interview.module.scss";
import InterviewNavigation from "../../components/interviewNavigation/InterviewNavigation";
import InterviewContent from "../../components/interviewContent/InterviewContent";
import {motion} from "framer-motion";

import {
    setCurrentQuestion,
    setQuestionAmount,
    setQuestions,
    setRemainingTime,
} from "../../redux/toolkit/interviewManagementSlice.js";
import {useDispatch, useSelector} from "react-redux";
import InterviewHeader from "../../components/interviewHeader/InterviewHeader.jsx";
import Redirect from "../../components/shared/Redirect/Redirect.jsx";
import systemWarning from "../../systemWarning.js";
import {useResponsiveBlock} from "../../hooks/useResponsiveBlock.jsx";
import {interviewFetch} from "../../redux/toolkit/interviewSlice.js";
import TestQuestion from "../../components/test/TestQuestion.jsx";


const Interview = () => {
    const dispatch = useDispatch();
    const responsiveBlock = useResponsiveBlock();
    const interviewInfo = useSelector((state) => state.interview?.interviewInfo);
    const questionList = useSelector((state) => state.interviewManagement.questions);
    const currentQuestion = useSelector((state) => state.interviewManagement.currentQuestion);


    useEffect(() => {
        dispatch(interviewFetch("08de5872-5868-4400-a655-71800a22bf78"));
    }, []);

    useEffect(() => {
        dispatch(setQuestions(interviewInfo?.data.questions));
        dispatch(setCurrentQuestion(interviewInfo?.data.questions[0]));
        dispatch(setRemainingTime(interviewInfo?.data.interview_time));
        dispatch(setQuestionAmount(interviewInfo?.question_amount));
    }, [interviewInfo]);

    const handleSelectedQuestion = (index) => {
        dispatch(setCurrentQuestion(questionList[index]));
        console.log("current question", questionList);
    };

    return (<motion.div
        className={styles.interview_container}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
    >
        {responsiveBlock && <div className={styles.interview}>
            <InterviewHeader/>
            <div className={styles.interview_down}>
                <InterviewNavigation handleSelectedQuestion={handleSelectedQuestion}/>
                {currentQuestion?.type !== "Test" && <InterviewContent/>}
                {currentQuestion?.type === "Test" && <TestQuestion/>}
            </div>
        </div>}
        {!responsiveBlock && <Redirect text={systemWarning.no_responsive_design}/>}

    </motion.div>);
};

export default Interview;

const dummyData = {
    remainingTime: "60:05",
    id: 1,
    name: "Mülakat",
    description: "Mülakat soruları",

    questions: [{
        number: 0,
        type: "diagram",
        question: "\n" + "Diagram ipsum dolor sit amet, consectetur adipiscing elit. Cras mi ante, tempus et urna ac, interdum posuere libero. Phasellus ac tortor sit amet felis blandit tempor ac vel velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris a sagittis mauris. Vivamus scelerisque ultrices ipsum. Vestibulum molestie leo et dignissim vestibulum. Duis molestie arcu nunc, vitae fringilla massa viverra sed. Fusce non erat at massa condimentum pulvinar. Aliquam lacinia diam nunc, euismod tincidunt dui porta vitae. Integer urna ligula, sodales et orci sed, pellentesque cursus velit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse massa nulla, condimentum sed pharetra ac, pulvinar ac neque. Nunc accumsan fringilla sapien et cursus. Nunc egestas massa dolor, quis porta lorem venenatis vel. Integer pretium lectus diam, nec malesuada eros posuere sit amet.\n" + "\n" + "Donec pretium convallis fermentum. Donec varius leo urna, ac cursus nisi euismod quis. Nullam at odio ac est egestas consequat. Curabitur efficitur dolor ac tortor tempor, in porta nulla congue. Quisque ligula purus, cursus eu justo quis, vestibulum tempus est. Integer metus lacus, aliquam id nunc nec, imperdiet pretium elit. Curabitur nec dictum neque, in tempus sem. Phasellus egestas nulla finibus massa convallis facilisis. Quisque rhoncus nulla ut dignissim tincidunt. Aliquam tellus tellus, volutpat nec ante iaculis, condimentum condimentum tortor. Morbi ornare faucibus arcu, sed sollicitudin erat commodo malesuada. Pellentesque iaculis, nisi non condimentum euismod, eros tellus vulputate est, non imperdiet mauris tortor at risus. Cras pretium eros sed nisl feugiat, vel cursus dolor pellentesque.\n" + "\n" + "Vivamus nunc risus, bibendum eu condimentum vel, dignissim eget est. Integer aliquam molestie odio tempus porttitor. In venenatis tellus quis feugiat euismod. Nullam ut lacus sed lorem aliquam mollis eu eu elit. Morbi id dolor venenatis dolor ornare dapibus. Suspendisse convallis auctor risus, at scelerisque ipsum sagittis vitae. Quisque condimentum erat ut turpis dapibus, in tempus turpis volutpat. Integer bibendum nisl in dapibus scelerisque. In viverra blandit massa, in finibus nunc feugiat ac. Sed molestie a sapien eget blandit. Pellentesque imperdiet consectetur tristique.\n" + "\n" + "Phasellus vitae egestas dui. Vestibulum vel libero ornare, blandit ante sed, venenatis arcu. Duis ornare, velit eget varius consectetur, dui magna laoreet metus, viverra sollicitudin lectus ante nec felis. Nam ut lacus gravida enim aliquam varius. Praesent varius, justo vitae euismod finibus, massa urna eleifend eros, in aliquet diam orci nec massa. Proin ut gravida massa, a accumsan sem. Proin ut lorem ac nisi congue porttitor vitae at turpis. Fusce maximus ullamcorper lacus, sit amet tempor enim pulvinar in. Phasellus quis nunc posuere, ultrices dui quis, condimentum nisi. Nam blandit feugiat diam.\n" + "\n" + "Maecenas fermentum porttitor metus, ac imperdiet turpis porttitor eu. Etiam vel vehicula nisl. Donec et tristique odio, in mollis sem. Nam nec vestibulum justo, a ultrices turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi nec ante euismod, laoreet lectus at, posuere urna. Donec in pretium enim. Nunc venenatis vulputate mi, eu imperdiet diam pulvinar nec. Integer rhoncus molestie leo. Duis interdum ullamcorper ipsum, in condimentum erat ullamcorper vel. Integer sed augue eu risus placerat pharetra.",
    },
        {
            number: 1, type: "test", question: ["Test sorusu 1", "Test sorusu 2", "Test sorusu 3"],
        }, {
            mode: "ace/mode/javascript",
            number: 2,
            type: "algorithm",
            question: "# Forest Management: Optimal Tree Arrangement\n" +
                "\n" +
                "**ID:** `tree-forest-management-1024`  \n" +
                "**Topic:** Trees  \n" +
                "**Difficulty Level:** Advanced\n" +
                "\n" +
                "## Description\n" +
                "\n" +
                "### Scenario\n" +
                "In a new forest management program, a variety of tree species are being planted in rows. Each tree species has a different growth rate and environmental impact. The goal is to arrange the trees in each row so that the total environmental impact is maximized over a given time period. Each tree species is represented by a unique integer, and their growth rates and environmental impact scores are given in arrays.\n" +
                "\n" +
                "### Question\n" +
                "Given arrays representing different tree species, their growth rates, and their environmental impact scores, find an arrangement of trees that maximizes the total environmental impact over the given period.\n" +
                "\n" +
                "## Real Life Application\n" +
                "This problem mirrors real-world scenarios in environmental planning and forest management, where maximizing the ecological benefit of tree planting is crucial.\n" +
                "\n" +
                "## Time Complexity Analysis\n" +
                "- **Best Case:** O(n log n)\n" +
                "- **Average Case:** O(n^2)\n" +
                "- **Worst Case:** O(n^2)\n" +
                "\n" +
                "## Example\n" +
                "**Input:**  \n" +
                "`[{species: 1, growthRate: 3, impact: 5}, {species: 2, growthRate: 2, impact: 6}, {species: 3, growthRate: 1, impact: 7}]`\n" +
                "\n" +
                "**Output:**  \n" +
                "`[3, 2, 1]`", code: "console.log(\"Hello, World!\");"
        }, {
            mode: "ace/mode/java",
            number: 3,
            type: "algorithm",
            question: "Elbette, bir algoritma sorusu hazırlayabilirim. İşte Hash Table konusunda orta seviye bir Java algoritma sorusu:\n\n---\n\n**Soru: Hash Table ile Kelime Frekansı Sayma**\n\nBir metin belgesindeki kelimelerin frekansını hesaplayan bir program yazman gerekiyor. Kelime frekanslarını tutmak için bir Hash Table kullanacaksın. Örneğin, 'Merhaba dünya. Merhaba insanlar.' gibi bir giriş metni için, 'Merhaba' kelimesi 2 kez geçtiği için frekansı 2 olacak.\n\n**Girdi:**\nBir metin belgesi veya metni içeren bir string.\n\n**Çıktı:**\nHer bir kelimenin metinde kaç kez geçtiğini içeren bir liste veya Hash Table yapısı.\n\n**Örnek Girdi:**\n```plaintext\nString metin = 'Java Hash Table ile algoritmaları öğrenmek çok keyifli. Java öğrenirken pratik yapmak önemlidir.'\n```\n\n**Örnek Çıktı:**\n```plaintext\nJava: 2\nHash: 1\nTable: 1\nile: 1\nalgoritmaları: 1\nöğrenmek: 1\nçok: 1\nkeyifli: 1\nöğrenirken: 1\npratik: 1\nyapmak: 1\nönemlidir: 1\n```\n\n**Beklenen Genel Davranış:**\n1. Metin bir string olarak alınacak.\n2. Metin kelimelere ayrılacak ve her kelimenin frekansı bir Hash Table içinde tutulacak.\n3. Her kelimenin frekansı hesaplanacak ve çıktı olarak bu frekanslar listelenecek.\n\n**Sorunun Çözümünde Kullanılacak Ancak İçi Boş Kod Parçası:**\n```java\npublic HashMap<String, Integer> kelimeFrekansi(String metin) {\n    // Kod buraya gelecek\n}\n```\n\n**Sorunun Tam Kod Çözümü:**\n```java\npublic HashMap<String, Integer> kelimeFrekansi(String metin) {\n    String[] kelimeler = metin.split('\\\\s+');\n    HashMap<String, Integer> frekanslar = new HashMap<>();\n\n    for (String kelime : kelimeler) {\n        kelime = kelime.toLowerCase(); // Büyük-küçük harf duyarlılığını kaldırmak için\n        if (frekanslar.containsKey(kelime)) {\n            frekanslar.put(kelime, frekanslar.get(kelime) + 1);\n        } else {\n            frekanslar.put(kelime, 1);\n        }\n    }\n\n    return frekanslar;\n}\n```\n\nBu algoritma, verilen metin içindeki kelimelerin frekansını hesaplayarak bir Hash Table içinde tutuyor. Bu sorunun çözümünde Hash Table'ın nasıl kullanılacağını ve string işlemlerinin nasıl yapılabileceğini gösteriyor. Umarım bu senin için yararlı bir algoritma sorusu olur!"
            , code: "public class HelloWorld {\n" +
                "\n" +
                "    public static void main(String[] args) {\n" +
                "        System.out.println(\"Hello, World!\");\n" +
                "    }\n" +
                "}\n"

        }, {
            mode: "ace/mode/python",
            number: 4,
            type: "algorithm",
            question: "\n" + "Algoritma ipsum dolor sit amet, consectetur adipiscing elit. Cras mi ante, tempus et urna ac, interdum posuere libero. Phasellus ac tortor sit amet felis blandit tempor ac vel velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris a sagittis mauris. Vivamus scelerisque ultrices ipsum. Vestibulum molestie leo et dignissim vestibulum. Duis molestie arcu nunc, vitae fringilla massa viverra sed. Fusce non erat at massa condimentum pulvinar. Aliquam lacinia diam nunc, euismod tincidunt dui porta vitae. Integer urna ligula, sodales et orci sed, pellentesque cursus velit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse massa nulla, condimentum sed pharetra ac, pulvinar ac neque. Nunc accumsan fringilla sapien et cursus. Nunc egestas massa dolor, quis porta lorem venenatis vel. Integer pretium lectus diam, nec malesuada eros posuere sit amet.\n" + "\n" + "Donec pretium convallis fermentum. Donec varius leo urna, ac cursus nisi euismod quis. Nullam at odio ac est egestas consequat. Curabitur efficitur dolor ac tortor tempor, in porta nulla congue. Quisque ligula purus, cursus eu justo quis, vestibulum tempus est. Integer metus lacus, aliquam id nunc nec, imperdiet pretium elit. Curabitur nec dictum neque, in tempus sem. Phasellus egestas nulla finibus massa convallis facilisis. Quisque rhoncus nulla ut dignissim tincidunt. Aliquam tellus tellus, volutpat nec ante iaculis, condimentum condimentum tortor. Morbi ornare faucibus arcu, sed sollicitudin erat commodo malesuada. Pellentesque iaculis, nisi non condimentum euismod, eros tellus vulputate est, non imperdiet mauris tortor at risus. Cras pretium eros sed nisl feugiat, vel cursus dolor pellentesque.\n" + "\n" + "Vivamus nunc risus, bibendum eu condimentum vel, dignissim eget est. Integer aliquam molestie odio tempus porttitor. In venenatis tellus quis feugiat euismod. Nullam ut lacus sed lorem aliquam mollis eu eu elit. Morbi id dolor venenatis dolor ornare dapibus. Suspendisse convallis auctor risus, at scelerisque ipsum sagittis vitae. Quisque condimentum erat ut turpis dapibus, in tempus turpis volutpat. Integer bibendum nisl in dapibus scelerisque. In viverra blandit massa, in finibus nunc feugiat ac. Sed molestie a sapien eget blandit. Pellentesque imperdiet consectetur tristique.\n" + "\n" + "Phasellus vitae egestas dui. Vestibulum vel libero ornare, blandit ante sed, venenatis arcu. Duis ornare, velit eget varius consectetur, dui magna laoreet metus, viverra sollicitudin lectus ante nec felis. Nam ut lacus gravida enim aliquam varius. Praesent varius, justo vitae euismod finibus, massa urna eleifend eros, in aliquet diam orci nec massa. Proin ut gravida massa, a accumsan sem. Proin ut lorem ac nisi congue porttitor vitae at turpis. Fusce maximus ullamcorper lacus, sit amet tempor enim pulvinar in. Phasellus quis nunc posuere, ultrices dui quis, condimentum nisi. Nam blandit feugiat diam.\n" + "\n" + "Maecenas fermentum porttitor metus, ac imperdiet turpis porttitor eu. Etiam vel vehicula nisl. Donec et tristique odio, in mollis sem. Nam nec vestibulum justo, a ultrices turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi nec ante euismod, laoreet lectus at, posuere urna. Donec in pretium enim. Nunc venenatis vulputate mi, eu imperdiet diam pulvinar nec. Integer rhoncus molestie leo. Duis interdum ullamcorper ipsum, in condimentum erat ullamcorper vel. Integer sed augue eu risus placerat pharetra.",
            code: "print(\"Hello, World!\")\n"
        }, {
            number: 5,
            type: "document",
            question: "\n" + "Döküman ipsum dolor sit amet, consectetur adipiscing elit. Cras mi ante, tempus et urna ac, interdum posuere libero. Phasellus ac tortor sit amet felis blandit tempor ac vel velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris a sagittis mauris. Vivamus scelerisque ultrices ipsum. Vestibulum molestie leo et dignissim vestibulum. Duis molestie arcu nunc, vitae fringilla massa viverra sed. Fusce non erat at massa condimentum pulvinar. Aliquam lacinia diam nunc, euismod tincidunt dui porta vitae. Integer urna ligula, sodales et orci sed, pellentesque cursus velit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse massa nulla, condimentum sed pharetra ac, pulvinar ac neque. Nunc accumsan fringilla sapien et cursus. Nunc egestas massa dolor, quis porta lorem venenatis vel. Integer pretium lectus diam, nec malesuada eros posuere sit amet.\n" + "\n" + "Donec pretium convallis fermentum. Donec varius leo urna, ac cursus nisi euismod quis. Nullam at odio ac est egestas consequat. Curabitur efficitur dolor ac tortor tempor, in porta nulla congue. Quisque ligula purus, cursus eu justo quis, vestibulum tempus est. Integer metus lacus, aliquam id nunc nec, imperdiet pretium elit. Curabitur nec dictum neque, in tempus sem. Phasellus egestas nulla finibus massa convallis facilisis. Quisque rhoncus nulla ut dignissim tincidunt. Aliquam tellus tellus, volutpat nec ante iaculis, condimentum condimentum tortor. Morbi ornare faucibus arcu, sed sollicitudin erat commodo malesuada. Pellentesque iaculis, nisi non condimentum euismod, eros tellus vulputate est, non imperdiet mauris tortor at risus. Cras pretium eros sed nisl feugiat, vel cursus dolor pellentesque.\n" + "\n" + "Vivamus nunc risus, bibendum eu condimentum vel, dignissim eget est. Integer aliquam molestie odio tempus porttitor. In venenatis tellus quis feugiat euismod. Nullam ut lacus sed lorem aliquam mollis eu eu elit. Morbi id dolor venenatis dolor ornare dapibus. Suspendisse convallis auctor risus, at scelerisque ipsum sagittis vitae. Quisque condimentum erat ut turpis dapibus, in tempus turpis volutpat. Integer bibendum nisl in dapibus scelerisque. In viverra blandit massa, in finibus nunc feugiat ac. Sed molestie a sapien eget blandit. Pellentesque imperdiet consectetur tristique.\n" + "\n" + "Phasellus vitae egestas dui. Vestibulum vel libero ornare, blandit ante sed, venenatis arcu. Duis ornare, velit eget varius consectetur, dui magna laoreet metus, viverra sollicitudin lectus ante nec felis. Nam ut lacus gravida enim aliquam varius. Praesent varius, justo vitae euismod finibus, massa urna eleifend eros, in aliquet diam orci nec massa. Proin ut gravida massa, a accumsan sem. Proin ut lorem ac nisi congue porttitor vitae at turpis. Fusce maximus ullamcorper lacus, sit amet tempor enim pulvinar in. Phasellus quis nunc posuere, ultrices dui quis, condimentum nisi. Nam blandit feugiat diam.\n" + "\n" + "Maecenas fermentum porttitor metus, ac imperdiet turpis porttitor eu. Etiam vel vehicula nisl. Donec et tristique odio, in mollis sem. Nam nec vestibulum justo, a ultrices turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi nec ante euismod, laoreet lectus at, posuere urna. Donec in pretium enim. Nunc venenatis vulputate mi, eu imperdiet diam pulvinar nec. Integer rhoncus molestie leo. Duis interdum ullamcorper ipsum, in condimentum erat ullamcorper vel. Integer sed augue eu risus placerat pharetra.",
        }, {
            number: 6,
            type: "document",
            question: "\n" + "Döküman ipsum dolor sit amet, consectetur adipiscing elit. Cras mi ante, tempus et urna ac, interdum posuere libero. Phasellus ac tortor sit amet felis blandit tempor ac vel velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris a sagittis mauris. Vivamus scelerisque ultrices ipsum. Vestibulum molestie leo et dignissim vestibulum. Duis molestie arcu nunc, vitae fringilla massa viverra sed. Fusce non erat at massa condimentum pulvinar. Aliquam lacinia diam nunc, euismod tincidunt dui porta vitae. Integer urna ligula, sodales et orci sed, pellentesque cursus velit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse massa nulla, condimentum sed pharetra ac, pulvinar ac neque. Nunc accumsan fringilla sapien et cursus. Nunc egestas massa dolor, quis porta lorem venenatis vel. Integer pretium lectus diam, nec malesuada eros posuere sit amet.\n" + "\n" + "Donec pretium convallis fermentum. Donec varius leo urna, ac cursus nisi euismod quis. Nullam at odio ac est egestas consequat. Curabitur efficitur dolor ac tortor tempor, in porta nulla congue. Quisque ligula purus, cursus eu justo quis, vestibulum tempus est. Integer metus lacus, aliquam id nunc nec, imperdiet pretium elit. Curabitur nec dictum neque, in tempus sem. Phasellus egestas nulla finibus massa convallis facilisis. Quisque rhoncus nulla ut dignissim tincidunt. Aliquam tellus tellus, volutpat nec ante iaculis, condimentum condimentum tortor. Morbi ornare faucibus arcu, sed sollicitudin erat commodo malesuada. Pellentesque iaculis, nisi non condimentum euismod, eros tellus vulputate est, non imperdiet mauris tortor at risus. Cras pretium eros sed nisl feugiat, vel cursus dolor pellentesque.\n" + "\n" + "Vivamus nunc risus, bibendum eu condimentum vel, dignissim eget est. Integer aliquam molestie odio tempus porttitor. In venenatis tellus quis feugiat euismod. Nullam ut lacus sed lorem aliquam mollis eu eu elit. Morbi id dolor venenatis dolor ornare dapibus. Suspendisse convallis auctor risus, at scelerisque ipsum sagittis vitae. Quisque condimentum erat ut turpis dapibus, in tempus turpis volutpat. Integer bibendum nisl in dapibus scelerisque. In viverra blandit massa, in finibus nunc feugiat ac. Sed molestie a sapien eget blandit. Pellentesque imperdiet consectetur tristique.\n" + "\n" + "Phasellus vitae egestas dui. Vestibulum vel libero ornare, blandit ante sed, venenatis arcu. Duis ornare, velit eget varius consectetur, dui magna laoreet metus, viverra sollicitudin lectus ante nec felis. Nam ut lacus gravida enim aliquam varius. Praesent varius, justo vitae euismod finibus, massa urna eleifend eros, in aliquet diam orci nec massa. Proin ut gravida massa, a accumsan sem. Proin ut lorem ac nisi congue porttitor vitae at turpis. Fusce maximus ullamcorper lacus, sit amet tempor enim pulvinar in. Phasellus quis nunc posuere, ultrices dui quis, condimentum nisi. Nam blandit feugiat diam.\n" + "\n" + "Maecenas fermentum porttitor metus, ac imperdiet turpis porttitor eu. Etiam vel vehicula nisl. Donec et tristique odio, in mollis sem. Nam nec vestibulum justo, a ultrices turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi nec ante euismod, laoreet lectus at, posuere urna. Donec in pretium enim. Nunc venenatis vulputate mi, eu imperdiet diam pulvinar nec. Integer rhoncus molestie leo. Duis interdum ullamcorper ipsum, in condimentum erat ullamcorper vel. Integer sed augue eu risus placerat pharetra.",
        },],
    answers: [{
        type: "diagram", answer: "Diagram cevabı",
    }, {
        type: "test", answer: ["Test cevabı 1", "Test cevabı 2", "Test cevabı 3"],
    }, {
        type: "algorithm", answer: "Kod cevabı",
    }, {
        type: "document", answer: "Döküman cevabı",
    },]
};

const question = {
    "id": "1",
    "name": "Find the Maximum Element in an Array",
    "type": "Coding",
    "topic": "Array",
    "level": {
        "id": "1",
        "name": "Easy"
    },
    "description": "Write a JavaScript function to find the maximum element in a given array of numbers. The function should take an array of numbers as an input and return the largest number in the array.",
    "example_input": "[3, 1, 4, 6, 5]",
    "example_output": "6",
    "missing_part": "function findMaxElement(arr) {\n    // Write your code here\n}",
    "answer": "function findMaxElement(arr) {\n    return Math.max(...arr);\n}",
    "answer_explanation": "The function uses the spread operator (...) to spread the elements of the array as individual arguments to the Math.max() function, which returns the largest of the numbers."
}

const question_0 = {
    "id": "001",
    "name": "Find the Maximum Element in an Array",
    "topic": "array",
    "level": "easy",
    "description": "Write a function that takes an array of integers and returns the maximum element in the array.",
    "example_input": "[3, 1, 4, 6, 2]",
    "example_output": "6",
    "missing_part": [
        {
            "language": "JavaScript",
            "code_snippet": "function findMaxElement(arr) {\n    // Your code here\n}"
        },
        {
            "language": "Java",
            "code_snippet": "public static int findMaxElement(int[] arr) {\n    // Your code here\n}"
        },
        {
            "language": "Python",
            "code_snippet": "def find_max_element(arr):\n    # Your code here\n"
        },
        {
            "language": "C#",
            "code_snippet": "public static int FindMaxElement(int[] arr) {\n    // Your code here\n}"
        }
    ],
    "answer": [
        {
            "language": "JavaScript",
            "solution_code": "function findMaxElement(arr) {\n    return Math.max(...arr);\n}"
        },
        {
            "language": "Java",
            "solution_code": "public static int findMaxElement(int[] arr) {\n    return Arrays.stream(arr).max().getAsInt();\n}"
        },
        {
            "language": "Python",
            "solution_code": "def find_max_element(arr):\n    return max(arr)\n"
        },
        {
            "language": "C#",
            "solution_code": "public static int FindMaxElement(int[] arr) {\n    return arr.Max();\n}"
        }
    ],
    "answer_explanation": "The solution involves iterating through the array to find the maximum value. Each language provides a built-in method or function to simplify this process.",
    "test_input_output_10": [
        [{"input": "[1, 2, 3]", "output": "3"}],
        [{"input": "[10, 9, 8, 7]", "output": "10"}],
        [{"input": "[-3, -1, -2]", "output": "-1"}],
        [{"input": "[5]", "output": "5"}],
        [{"input": "[0, 0, 0, 0]", "output": "0"}],
        [{"input": "[100, 200, 300, 400, 500]", "output": "500"}],
        [{"input": "[-10, -20, -30, -40]", "output": "-10"}],
        [{"input": "[1, 1, 1, 1, 1, 1]", "output": "1"}],
        [{"input": "[99, 85, 101, 88]", "output": "101"}],
        [{"input": "[-5, -10, -15, -5, -3]", "output": "-3"}]
    ]
}

const question_2 = {
    "id": "002",
    "name": "Longest Increasing Subsequence",
    "topic": "dynamic programming",
    "level": "medium",
    "description": "Given an array of integers, write a function to find the length of the longest increasing subsequence (LIS) in the array. The subsequence must be strictly increasing.",
    "example_input": "[10, 22, 9, 33, 21, 50, 41, 60, 80]",
    "example_output": "6",
    "missing_part": [
        {
            "language": "JavaScript",
            "code_snippet": "function lengthOfLIS(nums) {\n    // Your code here\n}"
        },
        {
            "language": "Java",
            "code_snippet": "public static int lengthOfLIS(int[] nums) {\n    // Your code here\n}"
        },
        {
            "language": "Python",
            "code_snippet": "def length_of_LIS(nums):\n    # Your code here\n"
        },
        {
            "language": "C#",
            "code_snippet": "public static int LengthOfLIS(int[] nums) {\n    // Your code here\n}"
        }
    ],
    "answer": [
        {
            "language": "JavaScript",
            "solution_code": "function lengthOfLIS(nums) {\n    const dp = Array(nums.length).fill(1);\n    for (let i = 1; i < nums.length; i++) {\n        for (let j = 0; j < i; j++) {\n            if (nums[i] > nums[j]) {\n                dp[i] = Math.max(dp[i], dp[j] + 1);\n            }\n        }\n    }\n    return Math.max(...dp);\n}"
        },
        {
            "language": "Java",
            "solution_code": "public static int lengthOfLIS(int[] nums) {\n    int[] dp = new int[nums.length];\n    Arrays.fill(dp, 1);\n    for (int i = 1; i < nums.length; i++) {\n        for (int j = 0; j < i; j++) {\n            if (nums[i] > nums[j]) {\n                dp[i] = Math.max(dp[i], dp[j] + 1);\n            }\n        }\n    }\n    return Arrays.stream(dp).max().getAsInt();\n}"
        },
        {
            "language": "Python",
            "solution_code": "def length_of_LIS(nums):\n    dp = [1] * len(nums)\n    for i in range(1, len(nums)):\n        for j in range(i):\n            if nums[i] > nums[j]:\n                dp[i] = max(dp[i], dp[j] + 1)\n    return max(dp)\n"
        },
        {
            "language": "C#",
            "solution_code": "public static int LengthOfLIS(int[] nums) {\n    int[] dp = new int[nums.Length];\n    Array.Fill(dp, 1);\n    for (int i = 1; i < nums.Length; i++) {\n        for (int j = 0; j < i; j++) {\n            if (nums[i] > nums[j]) {\n                dp[i] = Math.Max(dp[i], dp[j] + 1);\n            }\n        }\n    }\n    return dp.Max();\n}"
        }
    ],
    "answer_explanation": "The solution uses dynamic programming to build an array 'dp' where dp[i] represents the length of the longest increasing subsequence ending with nums[i]. For each element, the algorithm checks all previous elements to update its longest subsequence.",
    "test_input_output_10": [
        [{"input": "[10, 9, 2, 5, 3, 7, 101, 18]", "output": "4"}],
        [{"input": "[0, 1, 0, 3, 2, 3]", "output": "4"}],
        [{"input": "[7, 7, 7, 7, 7, 7, 7]", "output": "1"}],
        [{"input": "[1, 3, 6, 7, 9, 4, 10, 5, 6]", "output": "6"}],
        [{"input": "[3, 10, 2, 1, 20]", "output": "3"}],
        [{"input": "[3, 2]", "output": "1"}],
        [{"input": "[50, 3, 10, 7, 40, 80]", "output": "4"}],
        [{"input": "[10, 22, 9, 33, 50, 41, 60]", "output": "5"}],
        [{"input": "[4, 10, 4, 3, 8, 9]", "output": "3"}],
        [{"input": "[10, 20, 30, 10, 20, 30, 40, 50]", "output": "5"}]
    ]
}

const question_3 = {
    "id": "003",
    "name": "Minimum Cost to Connect All Nodes",
    "topic": "graph",
    "level": "hard",
    "description": "Given an undirected graph with weighted edges and a set of new edges with their costs, find the minimum cost to add a subset of these new edges such that all nodes in the graph are connected (i.e., there's a path between every pair of nodes). Assume the graph initially may not be fully connected.",
    "example_input": "{\n  'existing_edges': [[1, 2, 5], [1, 3, 10]],\n  'new_edges': [[2, 3, 2], [3, 4, 4]]\n}",
    "example_output": "6",
    "missing_part": [
        {
            "language": "JavaScript",
            "code_snippet": "function minCostToConnectAllNodes(existingEdges, newEdges) {\n    // Your code here\n}"
        },
        {
            "language": "Java",
            "code_snippet": "public static int minCostToConnectAllNodes(int[][] existingEdges, int[][] newEdges) {\n    // Your code here\n}"
        },
        {
            "language": "Python",
            "code_snippet": "def min_cost_to_connect_all_nodes(existing_edges, new_edges):\n    # Your code here\n"
        },
        {
            "language": "C#",
            "code_snippet": "public static int MinCostToConnectAllNodes(int[][] existingEdges, int[][] newEdges) {\n    // Your code here\n}"
        }
    ],
    "answer": [
        {
            "language": "JavaScript",
            "solution_code": "// JavaScript solution using Union Find\nfunction minCostToConnectAllNodes(existingEdges, newEdges) {\n    // Implementation of Union Find and Kruskal's Algorithm\n}"
        },
        {
            "language": "Java",
            "solution_code": "// Java solution using Union Find\npublic static int minCostToConnectAllNodes(int[][] existingEdges, int[][] newEdges) {\n    // Implementation of Union Find and Kruskal's Algorithm\n}"
        },
        {
            "language": "Python",
            "solution_code": "# Python solution using Union Find\ndef min_cost_to_connect_all_nodes(existing_edges, new_edges):\n    # Implementation of Union Find and Kruskal's Algorithm\n"
        },
        {
            "language": "C#",
            "solution_code": "// C# solution using Union Find\npublic static int MinCostToConnectAllNodes(int[][] existingEdges, int[][] newEdges) {\n    // Implementation of Union Find and Kruskal's Algorithm\n}"
        }
    ],
    "answer_explanation": "The solution employs a Union-Find data structure to keep track of connected components and uses Kruskal's algorithm to add the lowest cost edges first, ensuring a minimal cost to connect all nodes. The process involves sorting the new edges by cost, then iteratively adding them if they connect previously unconnected components.",
    "test_input_output_10": [
        [{"input": "{\n  'existing_edges': [[1, 2, 3]],\n  'new_edges': [[2, 3, 5]]\n}", "output": "5"}],
        [{
            "input": "{\n  'existing_edges': [[1, 4, 3], [4, 5, 6]],\n  'new_edges': [[1, 2, 2], [2, 3, 4], [3, 4, 8]]\n}",
            "output": "6"
        }],
        [{
            "input": "{\n  'existing_edges': [[1, 2, 1], [2, 3, 2]],\n  'new_edges': [[3, 4, 3], [4, 5, 4]]\n}",
            "output": "7"
        }],
        [{"input": "{\n  'existing_edges': [],\n  'new_edges': [[1, 2, 3], [2, 3, 4]]\n}", "output": "7"}],
        [{"input": "{\n  'existing_edges': [[1, 2, 4], [2, 3, 5]],\n  'new_edges': [[3, 4, 6]]\n}", "output": "6"}],
        [{"input": "{\n  'existing_edges': [[1, 3, 10]],\n  'new_edges': [[1, 2, 5], [2, 3, 15]]\n}", "output": "5"}],
        [{
            "input": "{\n  'existing_edges': [[1, 2, 3], [2, 4, 4]],\n  'new_edges': [[1, 3, 2], [3, 4, 1]]\n}",
            "output": "1"
        }],
        [{
            "input": "{\n  'existing_edges': [[1, 2, 1]],\n  'new_edges': [[2, 3, 2], [3, 4, 2], [4, 5, 2], [5, 1, 5]]\n}",
            "output": "6"
        }],
        [{"input": "{\n  'existing_edges': [[1, 2, 10]],\n  'new_edges': [[2, 3, 10], [3, 1, 20]]\n}", "output": "10"}],
        [{
            "input": "{\n  'existing_edges': [[1, 2, 7], [2, 3, 9]],\n  'new_edges': [[1, 3, 3], [3, 4, 4], [4, 2, 5]]\n}",
            "output": "7"
        }]
    ]
}

const best_question = {
    "id": "003",
    "name": "Queue Operations in a Supermarket",
    "topic": "queue",
    "level": "medium",
    "description": {
        "scenario": "In a busy supermarket, customers form a single queue to be served at multiple counters. Each customer has a distinct number of items to check out. The supermarket implements a system where the customer with the least number of items is served first. This requires dynamically arranging the queue as new customers join.",
        "question": "Implement a queue system that can efficiently sort customers based on the number of items they have, allowing the customer with the least number of items to be served next."
    },
    "real_life_application": "This system can be used in supermarkets, banks, or any service area where customers need to be served based on certain priorities to ensure fairness and efficiency.",
    "time_complexity_analysis": {
        "best_case": "O(log n)",
        "average_case": "O(log n)",
        "worst_case": "O(n)"
    },
    "example_input": "enqueue(5), enqueue(3), enqueue(6), dequeue(), enqueue(2), dequeue()",
    "example_output": "dequeue -> 3, dequeue -> 2",
    "missing_part": [
        {
            "language": "JavaScript",
            "code_snippet": "function PriorityQueue() {\n    // Your code here\n    this.enqueue = function(item) {};\n    this.dequeue = function() {};\n}"
        },
        {
            "language": "Java",
            "code_snippet": "public class PriorityQueue {\n    // Your code here\n    public void enqueue(int item) {}\n    public int dequeue() {}\n}"
        },
        {
            "language": "Python",
            "code_snippet": "class PriorityQueue:\n    def __init__(self):\n        # Your code here\n    def enqueue(self, item):\n        pass\n    def dequeue(self):\n        pass"
        },
        {
            "language": "C#",
            "code_snippet": "public class PriorityQueue {\n    // Your code here\n    public void Enqueue(int item) {}\n    public int Dequeue() {}\n}"
        }
    ],
    "answer": [
        {
            "language": "JavaScript",
            "solution_code": "function PriorityQueue() {\n    this.items = [];\n    this.enqueue = function(item) {\n        var added = false;\n        for (var i = 0; i < this.items.length; i++) {\n            if (item < this.items[i]) {\n                this.items.splice(i, 0, item);\n                added = true;\n                break;\n            }\n        }\n        if (!added) {\n            this.items.push(item);\n        }\n    };\n    this.dequeue = function() {\n        return this.items.shift();\n    };\n}"
        },
        {
            "language": "Java",
            "solution_code": "public class PriorityQueue {\n    private ArrayList<Integer> items = new ArrayList<Integer>();\n\n    public void enqueue(int item) {\n        int i;\n        for (i = 0; i < items.size(); i++) {\n            if (item < items.get(i)) {\n                break;\n            }\n        }\n        items.add(i, item);\n    }\n\n    public int dequeue() {\n        return items.remove(0);\n    }\n}"
        },
        {
            "language": "Python",
            "solution_code": "class PriorityQueue:\n    def __init__(self):\n        self.items = []\n\n    def enqueue(self, item):\n        for i, current_item in enumerate(self.items):\n            if item < current_item:\n                self.items.insert(i, item)\n                return\n        self.items.append(item)\n\n    def dequeue(self):\n        return self.items.pop(0)"
        },
        {
            "language": "C#",
            "solution_code": "public class PriorityQueue {\n    private List<int> items = new List<int>();\n\n    public void Enqueue(int item) {\n        int i;\n        for (i = 0; i < items.Count; i++) {\n            if (item < items[i]) {\n                break;\n            }\n        }\n        items.Insert(i, item);\n    }\n\n    public int Dequeue() {\n        int item = items[0];\n        items.RemoveAt(0);\n        return item;\n    }\n}"
        }
    ],
    "answer_explanation": "This solution implements a priority queue where each enqueue operation inserts the item in a position that maintains the order of the queue based on the number of items each customer has. The dequeue operation simply removes and returns the first element, which is always the customer with the least number of items.",
    "test_input_output_10": [
        [{"input": "enqueue(10), enqueue(20), dequeue()", "output": "dequeue -> 10"}],
        [{"input": "enqueue(5), enqueue(15), enqueue(3), dequeue()", "output": "dequeue -> 3"}],
        [{"input": "enqueue(7), enqueue(2), enqueue(9), dequeue(), dequeue()", "output": "dequeue -> 2, dequeue -> 7"}],
        [{"input": "enqueue(4), dequeue(), enqueue(6), dequeue()", "output": "dequeue -> 4, dequeue -> 6"}],
        [{"input": "enqueue(1), enqueue(1), enqueue(1), dequeue()", "output": "dequeue -> 1"}],
        [{"input": "enqueue(12), enqueue(6), enqueue(18), dequeue(), enqueue(5)", "output": "dequeue -> 6"}],
        [{
            "input": "enqueue(22), enqueue(11), enqueue(33), dequeue(), dequeue()",
            "output": "dequeue -> 11, dequeue -> 22"
        }],
        [{"input": "enqueue(8), enqueue(8), enqueue(8), dequeue()", "output": "dequeue -> 8"}],
        [{
            "input": "enqueue(17), enqueue(14), enqueue(19), dequeue(), dequeue()",
            "output": "dequeue -> 14, dequeue -> 17"
        }],
        [{"input": "enqueue(13), enqueue(21), enqueue(10), dequeue()", "output": "dequeue -> 10"}]
    ],
    "additional_resources": [
        {
            "name": "Understanding Priority Queues",
            "link": "https://www.geeksforgeeks.org/priority-queue-set-1-introduction/"
        },
        {
            "name": "Implementing Priority Queues in Different Languages",
            "link": "https://www.programiz.com/dsa/priority-queue"
        }
    ],
    "interactive_steps": [
        {
            "step_number": 1,
            "step_description": "Create a data structure to store the queue elements."
        },
        {
            "step_number": 2,
            "step_description": "Define the enqueue method to insert elements based on their priority."
        },
        {
            "step_number": 3,
            "step_description": "Implement the dequeue method to remove and return the element with the highest priority (in this case, the smallest number)."
        },
        {
            "step_number": 4,
            "step_description": "Ensure that the queue maintains its order after each operation."
        }
    ]
}
