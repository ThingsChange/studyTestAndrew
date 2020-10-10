/**
 *
 * @author  晴云
 * @create 2020-10-10 10:25
 * @note 干什么的呢？
 **/

class Node {
  constructor(item){
    this.next=null;
    this.val=item
  }
}
class LinkList {
  constructor(){
    this.length=0;
    this.head=null;
  }
  append(element){
    const node= new Node(element);
    let current=null;
    if(this.head===null){
      this.head=node
    }else{
      current=this.head;
      while(current.next){
        current=current.next
      }
      current.next=node;
    }
    this.length++;
  }
  insert(position,element){
    if(position>=0 && position<=this.length){
      const node =new Node(element);
      let current=this.head;
      let previous=null;
      let index=0;
      if(position===0){
        this.head=node;
      }else{
        while(index++ <position){
          previous=current;
          current=current.next;
        }
        node.next=current;
        previous.next=node;
      }
      this.length++;
      return true;
    }
    return false
  }
  remove(element){
    const index= this.findIndex(element);
    return this.removeAt(index);
  }
  removeAt(postion){
    if(postion>-1 && postion<this.length){
      let current=this.head;
      let previous=null;
      let index=0;
      if(!postion){
        this.head=current.next;
      }else{
        while(index++<postion){
          previous = current;
          current=current.next;
        }
        previous.next=current.next;
      }
      this.length--;
      return current.val
    }
    return null
  }
  findIndex(element){
    let current=this.head;
    let index=-1;
    while(current){
      if(current.val===element){
        return index+1;
      }
      index++
      current=current.next;
    }
    return -1;
  }
  isEmpty(){
    return !this.length
  }
  size(){
    return this.length
  }
  toString(){
    let current=this.head;
    let string='';
    while(current){
      string+=current.val;
      current=current.next;
    }
    return string;
  }
}

let linkedList=new LinkList();
console.log(linkedList);
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
linkedList.append(4)
linkedList.append(5)
linkedList.append(6)
linkedList.insert(3,18);
console.log(linkedList);
console.log(linkedList.findIndex(3))
