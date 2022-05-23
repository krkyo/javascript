window.addEventListener('DOMContentLoaded', function(e){
  console.log('Dom Loaded');
  const btnStart = document.querySelector('#btnStart');
  const numinput = document.querySelector('#numinput');
  const msg = document.querySelector('#msg');
  const btnInput = document.querySelector('#btnInput');
  const historyNum = document.querySelector('#historyNum');

  // 정답 변수
  let resultNum = -1;
  let hisNum = [];
  let resultMsg = "";

  // 게임 초기화 
  const startGame = function(){
    btnInput.style.display = 'block';
    msg.style.display = 'none';
    historyNum.textContent = '';
    historyNum.style.display = 'none';
    numinput.readOnly = false;
    numinput.value = "";
    numinput.focus();
    resultNum = Math.floor(Math.random() * 101);
    resultMsg = "";
    hisNum = [];
    console.log("정답 : " + resultNum);
  }

  // 게임 진행
  const gameIng = function(){
    if(numinput.value == "" || isNaN(numinput.value)){
      alert('숫자를 입력해주세요');
      numinput.value = "";
      numinput.focus();
      return false;
    }
    if(numinput.value < 0 || numinput.value > 100){
      alert('0 ~ 100 까지만 입력해주세요');
      numinput.value = "";
      numinput.focus();
      return false;
    }
    hisNum.push(numinput.value);
    if(hisNum.length > 0){
      historyNum.style="block";
      historyNum.textContent = `[ ${hisNum.join(', ')} ]`;
    }
    msg.style.display = 'block';
    if(resultNum > numinput.value){
      msg.textContent = "입력한 값보다 큽니다.";
    }else if(resultNum < numinput.value){
      msg.textContent = "입력한 값보다 작습니다.";
    }else{
      msg.innerHTML = '<span class="mt-2 mb-2  before:block before:absolute before:-inset-1 before:-skew-y-0 before:bg-pink-500 relative inline-block"> <span class="relative text-white">축하합니다. 정답입니다~! 👍👍👍</span></span>';

      numinput.value = "";
      numinput.readOnly = true;
      btnInput.style.display = 'none';
      return true;
    }

    if(hisNum.length >= 10){
      msg.style.display = 'block';
      msg.textContent = "아쉽네요. 게임이 종료되었습니다. 다시 시작하려면 '게임시작'을 눌러주세요.";
      numinput.value = "";
      numinput.readOnly = true;
      btnInput.style.display = 'none';
    }

    numinput.value = "";
    numinput.focus();
  }

  // 게임 시작 클릭시...
  btnStart.addEventListener('click', startGame);

  // 입력 클릭시...
  btnInput.addEventListener('click', gameIng);
  numinput.addEventListener('keyup', function(e){
    if(e.keyCode == 13){
      gameIng();
      return true;
    }
    return false;
  });
})