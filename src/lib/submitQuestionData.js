import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
    apiKey: 'AIzaSyBUdZL8norytqesePPv7aRRMAWFLHCbks8',
    authDomain: 'fairer-171bb.firebaseapp.com',
    projectId: 'fairer-171bb'
});
const db = firebase.firestore();

const validateQuestionData = dataObject => {
    const { choices, content, limitDate, target } = dataObject;
    if (!(choices && content && limitDate && target)) throw new Error('Unset property exists');
};

export const subminQuestionData = dataObject => {
    try {
        validateQuestionData(dataObject);
        const { choices, content, limitDate, target } = dataObject;
        const answer = Array(choices.length).fill(0);
        const createdDate = new Date();
        const respondent = [];
        db.collection('questions').doc().set({
            answer,
            choices,
            content,
            createdDate,
            limitDate,
            respondent,
            target
        });
    } catch(error) {
        console.error(error);
    }
};
