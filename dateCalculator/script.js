const tabList = document.getElementsByName('tabList');
const detentionTerm = document.getElementById('detentionTerm');
const renewDetention = document.getElementById('renewDetention');
const kind = document.getElementById('kind');
// Tab trans
detentionTerm.addEventListener('click', () => {
    forwardTab(detentionTerm);
});

renewDetention.addEventListener('click', () => {
    forwardTab(renewDetention);
});

kind.addEventListener('click', () => {
    forwardTab(kind);
});

// F chuyển tab
function forwardTab(tab) {
    for (let i = 0; i< tabList.length; i ++) {
        let tempContentId = tabList[i].id + 'Content';
        if (tabList[i].id !== tab.id)  {
            tabList[i].classList.remove('is-active');
            document.getElementById(tempContentId).classList.add('none');
        }
        else {
            tabList[i].classList.add('is-active');
            document.getElementById(tempContentId).classList.remove('none');
       
        }
    }
}