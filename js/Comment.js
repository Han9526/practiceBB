// 코딩 수칙

// 기본적 변수명 camelCase
// 상수는 전체 대문자 const VARIABLE
// 클래스 이름은 첫글자 대문자 People
// 변수 이름은 첫글자 소문자 person
// 변수명은 명사로 시작
// 함수명은 동사로 시작
// 주석은 간략한 설명은 변수명 함수명 위에 적기
// 자세한 설명은 아래에 적기
// 주석은 필수로 적어주기



import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { doc, getDoc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { db } from "./API_firestore.js"


export { orderBy, getDocs, query, onSnapshot, collection } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Add-CommentData
export async function addData(inputName, inputPassword, inputComment) {

    let inputDate = new Date();

    if (!inputName || !inputPassword || !inputComment) {
        alert("빈칸을 채워주세요");
        return;
    }

    let inputCommentData = {
        'id': inputName,
        'password': inputPassword,
        'comment': inputComment,
        'created_at': inputDate
    };

    try {
        await addDoc(collection(db, "chat_hsj"), inputCommentData);

        $('#chat-input-name').val('');
        $('#chat-input-password').val('');
        $('#chat-input-text').val('');
    } catch (error) {
        console.error(error)
    }
}
// Add-CommentData

// Add-CommentList
export function updateCommentList(snapshot) {
    $('#chat_list').empty(); // 댓글 목록 초기화 

    snapshot.forEach((doc) => {
        let chat_data = doc.data();
        let curdate = chat_data.created_at.seconds * 1000;
        const date = new Date(curdate);
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        let commentlist = `
        <tr>
          <td style="width: 15%">${chat_data.id}</td>
          <td style="width: 45%">${chat_data.comment}</td>
          <td style="width: 20%">${year}-${month}-${day}</td>
          <td style="width: 10%"><button id="edit_button"  data-chatdata_id=${doc.id}>edit</button></td>
          <td style="width: 10%"><button id="delete_button" data-chatdata_id=${doc.id}>del</button></td>
        </tr> `;
        $('#chat_list').append(commentlist);
    });
}
// Add-CommentList

//  Delet-Modal
export function deletModal(chatdocId) {
    let chatRef = doc(db, "chat_hsj", chatdocId);
    getDoc(chatRef).then(async (chatSnapshot) => {
        const chatClickData = chatSnapshot.data();
        const chatPassword = chatClickData.password;

        $('#Password_modal').modal('show');
        $('#Password_inputField').val('').focus();

        $('#Password_correct_btn').off().click(async function () {
            let inputPassword = $('#Password_inputField').val();
            if (inputPassword === chatPassword) {
                await deleteDoc(chatRef);
                alert('댓글이 삭제되었습니다.');
                $('#Password_inputField').val('');
                $('#Password_modal').modal('hide');
            } else {
                alert('비밀번호가 일치하지 않습니다.');
                $('#Password_inputField').val('');
                $('#Password_inputField').focus();
            }
        });
    });
}
//  Delet-Modal

// Edit-Modal
export function editModal(chatdocId) {
    let chatRef = doc(db, "chat_hsj", chatdocId);
    getDoc(chatRef).then(async (chatSnapshot) => {
        const chatClickData = chatSnapshot.data();
        const chatPassword = chatClickData.password;

        $('#Password_modal').modal('show');
        $('#Password_inputField').val('').focus();
        $('#Password_correct_btn').off().click(async function () {
            let inputPassword = $('#Password_inputField').val();
            if (inputPassword === chatPassword) {
                $('#Password_inputField').val('');
                $('#Password_modal').modal('hide');
                $('#Edit_modal').modal('show');
                $('#edit_inputField').focus();
            } else {
                alert('비밀번호가 일치하지 않습니다.');
                $('#Password_inputField').val('');
                $('#Password_inputField').focus();
            }
        });
    });
}
// Edit-Modal

// Edit-Comment
export function editComment(chatdocId) {
    let inputComment = $('#edit_inputField').val();
    let editDate = new Date();
    let chatRef = doc(db, "chat_hsj", chatdocId);

    updateDoc(chatRef, {
        comment: inputComment,
        created_at: editDate
    }).then(() => {
        $('#edit_inputField').val('');
        $('#Edit_modal').modal('hide');
        alert('수정완료');
    }).catch((error) => {
        alert('실패');
    });
}
// Edit-Comment