Vue.component("item", {
    props:{
        file_title: String,
        file_format : String,
        file_alt: String,
    },
    template: `
        <li id="item" class="input-group mb-3" draggable="true" @dragstart="dragStart($event)" @dragover.prevent @drop="drop()">
                <div class="input-group-prepend">
                    <span class="del_elem" @click="del_elem()" @change="hideOverflow()"></span>
                    <span class="input-group-text">{{ file_format }}</span>
                </div>
                <div class="item-name form-control" :title=file_alt @click="previewFile()">
                    {{ file_title }}
                </div>
                <div class="moving input-group-append">
                    <span class="input-group-text">
                        <span>•••</span>
                    </span>
                </div>
            </li>
    `,
    methods:{
        del_elem() {
            let index = vm.file_name.indexOf(this.file_title);
            vm.file_name.splice(index, 1);
            vm.file_format.splice(index, 1);
            vm.file_alt.splice(index, 1);
            vm.file.splice(index, 1);
            vm.display_object.splice(index, 1);
        },
        previewFile() {
            let fileUrl;
            let image = document.getElementById("display_img");
            let video = document.getElementById("display_vid");
            let audio = document.getElementById("display_aud");
            vm.display_title = this.file_alt;
            file = vm.file;
            let index = vm.file_alt.indexOf(this.file_alt);
            let file_type = file[index].type.slice(0, 5);
            if (file_type == "image"){
                video.style.display = "none";
                audio.style.display = "none";
                let reader = new FileReader()
                reader.readAsDataURL(file[index]);
                reader.onloadend = function () {
                    vm.display_src = reader.result;
                }
                image.style.display = "block";
            }
            else if(file_type == "video"){
                image.style.display = "none";
                audio.style.display = "none";
                fileUrl = vm.display_object[index];
                vm.display_src = fileUrl;
                video.style.display = "block";
            }
            else if(file_type == "audio"){
                image.style.display = "none";
                video.style.display = "none";
                fileUrl = vm.display_object[index];
                vm.display_src = fileUrl;
                audio.style.display = "block";
            }
        },
        hideOverflow() {
            let item_list = document.getElementById("items-list");
            if (this.file_name.length > 4) {
                item_list.style.overflowY = "scroll"
                item_list.style.heigth = 300 + "px";
            }
            else {
                item_list.style.overflowY = "hidden";
            }
        },
        dragStart(e){
            let index = vm.file_alt.indexOf(this.file_alt);
            vm.old_index = index;
        
        },
        drop(){
            let new_index = vm.file_alt.indexOf(this.file_alt);
            let old_index = vm.old_index;
            let buf;
            
            buf = vm.file_name[old_index];
            vm.file_name.splice(old_index, 1, vm.file_name[new_index]);
            vm.file_name.splice(new_index, 1, buf);

            buf = vm.file_format[old_index];
            vm.file_format.splice(old_index, 1, vm.file_format[new_index]);
            vm.file_format.splice(new_index, 1, buf);

            buf = vm.file_alt[old_index];
            vm.file_alt.splice(old_index, 1, vm.file_alt[new_index]);
            vm.file_alt.splice(new_index, 1, buf);

            buf = vm.file[old_index];
            vm.file.splice(old_index, 1, vm.file[new_index]);
            vm.file.splice(new_index, 1, buf);

            buf = vm.display_object[old_index];
            vm.display_object.splice(old_index, 1, vm.display_object[new_index]);
            vm.display_object.splice(new_index, 1, buf);
           
        }
        
    }
    })


vm = new Vue({
    el: "#main",
    data: {
        file: [],
        file_name: [],
        file_format: [],
        file_alt: [],
        display_src: "",
        display_title: "",
        display_object : [],
        old_index: Number,
    },
    methods:{
        get_info(){
            let file = document.getElementById("myfile").files[0];
            let name = file.name;
            if (this.file_alt.indexOf(name) != -1) {
                alert("Файл с таким названием уже загружен");
            }
            else{
                if (name.length >= 20) {
                    name = name.slice(0, 16);
                    name += "..." + file.name.slice(-3);
                }
                let format = file.type.slice(0, 3);
                this.file_name.push(name);
                this.file_format.push(format);
                this.file_alt.push(file.name);
                this.file.push(file);
                this.display_object.push(window.URL.createObjectURL(file));
            }
        },
        hideOverflow(){
            let item_list = document.getElementById("items-list");
            if (this.file_name.length > 4){
                item_list.style.overflowY = "scroll"
                item_list.style.heigth = 300 + "px";
            }
            else{
                item_list.style.overflowY = "hide";
            }
           
    }
    }

})

