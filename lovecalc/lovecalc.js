document.getElementById('calculatelove').addEventListener('click', function() {
    const name1 = document.getElementById('name1').value.trim();
    const name2 = document.getElementById('name2').value.trim();
    const result = document.getElementById('result');

    if (name1 === '' || name2 === '') {
        alert('Please enter both names.');
        return;
    }

    // generates random love percentage
    const score = Math.floor(Math.random() * 101);
    if(score>80){
    result.textContent = 'Congrats ' + (name1) + ' and ' + (name2) + ', your love compatibility is ' + (score) + "% !!!";
    }else if(score<50){
        result.textContent = 'Sorry ' + (name1) + ' and ' + (name2) + ', your love compatibility is ' + (score) + "% ...";
    }else if(score==1){
        result.textContent = 'oh..' + (score) + "%... feel better soon.."
    }else{
        result.textContent = (name1) + ' and ' + (name2) + ', your love compatibility is ' + (score) + "%";
    }
});