const getId = id =>document.getElementById(id);
const getClass = name =>document.querySelector(name);

const searchBtn = getId('search_btn');
const searchField = getId('search_field');
const input_slider = getClass('.input_slider');
const gallary = getClass('.gallary');
const show_gallary = getClass('.show_gallary');
const durations = getId('duration');
const sliderContent = getId('sliders');
let KEY ='13728938-af7df8b2c5e49a63a81ab2be7';
let sliders = [];
// get Image Function 
const getImage = input =>{
    fetch(`https://pixabay.com/api/?key=${KEY}&q=${input}&image_type=photo&pretty=true`)
    .then(res=>res.json())
    .then(data=>showImage(data.hits))
    .catch(err=>console.log(err))
}

// show Images Function 

const showImage = images =>{
    if(images.length ===0){
        alert('Search Result Not Fount');
        return;
    }
    input_slider.classList.remove('d-none');
    show_gallary.textContent='';
    images.forEach(img=>{
        const div = document.createElement('div');
        div.className = 'col-12 col-md-4 col-lg-3';
        div.innerHTML=`
      
            <div class="gallary_img">
                <img src="${img.webformatURL}" onclick=selectImage(event,"${img.webformatURL}") class="img-fluid thumble_img" alt="">
            </div>
        `;
        show_gallary.appendChild(div);
    })
}
var sliderIndex =0;
const selectImage = (e,img) =>{
    const element = e.target;
    element.classList.add('select_img');
    let item = sliders.includes(img);
    if(!item){
        sliders.push(img);
    }else{
        alert('Hey, Already added !');
    }
}
/*
    Search Button 
*/

let timer;

const createSlider = ()=>{
    const selectItem = sliders.length;
    if(selectItem<2){
        alert('Select at last 2 Image');
        return;
    }
    //clear data
    show_gallary.textContent='';
    input_slider.classList.add('d-none');

    let duration =1000 ;
    if(durations.value>0){
        duration = Number(durations.value);
    }
    sliders.forEach(img=>{
        let item = document.createElement('div');
        item.className = 'slider-item';
        item.innerHTML = `<img class="w-100" src="${img}" alt=""/>`;
        sliderContent.appendChild(item);
    })
    // changeSlider(0);
    timer = setInterval(function (){
        sliderIndex++;
        changeSlider(sliderIndex);
    },duration);
}

  
const changeSlider = index =>{
    const items = document.querySelectorAll('.slider-item');
    if(index >=items.length){
        index = 0;
        sliderIndex = 0;
    }
    items.forEach(item => {
        item.style.display = "none";
      })
    
      items[sliderIndex].style.display = 'block';
//   items[index].style.display = "block"
}
document.getElementById('creat_slider').addEventListener('click',()=>{
   createSlider()

})
searchBtn.addEventListener('click',()=>{
   
    if(!searchField.value){
        alert('Input Field is Requerd');
        return;
    }
    getImage(searchField.value);
    searchField.value = '';
    sliderContent.textContent ='';
    sliders.length =0;
})
