/**
中位数是有序列表中间的数。如果列表长度是偶数，中位数则是中间两个数的平均值。

例如，

[2,3,4] 的中位数是 3

[2,3] 的中位数是 (2 + 3) / 2 = 2.5

设计一个支持以下两种操作的数据结构：

void addNum(int num) - 从数据流中添加一个整数到数据结构中。
double findMedian() - 返回目前所有元素的中位数。
示例：

addNum(1)
addNum(2)
findMedian() -> 1.5
addNum(3) 
findMedian() -> 2
 */

/**
 * 思路
 * 可以使用大顶堆 + 小顶堆 处理
 * 大顶堆存放小于等于平均数的值
 * 小顶堆存放大于平均数的值
 * 
 * 大顶堆数量要大于等于小顶堆，当数量之差小于等于 1
 * 
 *
 * 当数据流的长度是奇数，那么平均值就是大顶堆的堆顶
 * 当数据流的长度是偶数, 那么平均值就是小顶堆 + 大顶堆堆顶值的平均值
 * 
 * 大顶堆是一棵树，每一个根结点的值都比左右节点的值大
 * 小顶堆也是一棵树，每一个根结点的值都比左右节点的值小
 * arr[1]就是堆顶
 */
var MedianFinder = function() {
    this.maxHeap = new Heap((a, b) => a > b); // 大顶堆 - 存放比平均值小的数
    this.minHeap = new Heap((a, b) => a < b); // 小顶堆
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
    if(!this.maxHeap.size || num < this.maxHeap.peek()) {
        this.maxHeap.push(num);
    } else {
        this.minHeap.push(num);
    }

    if (this.maxHeap.size - this.minHeap.size > 1) {
        this.minHeap.push(this.maxHeap.pop());
    }

    if (this.minHeap.size > this.maxHeap.size) {
        this.maxHeap.push(this.minHeap.pop());
    }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
    if ((this.maxHeap.size + this.minHeap.size) % 2 === 0) {
        return (this.maxHeap.peek() + this.minHeap.peek()) >> 1
    }

    return this.maxHeap.peek();
};


class Heap {
    constructor(compare) {
        this.arr = [0];
        this.compare = compare ? compare : (a, b) => a > b; // 默认是大顶堆
    }

    /**
     * 获取堆的大小
     */
    get size () {
        return this.arr.length - 1;
    }

    /**
     * 获取堆顶
     * @returns 
     */
    peek () {
        return this.arr[1];
    }
    /**
     * 获取父节点的下标
     */
    parentKey (k) {
        return Math.floor(k >> 1); // k >> 1 类似于 k / 2
    }
    
    /**
     * 获取左子节点的下标
     * @param {*} k 
     */
    childLeftKey(k) {
        return k * 2;
    }

    childRightKey(k) {
        return k * 2 + 1
    }

    push(val) {
        this.arr.push(val);
        this.shiftup(this.arr.length - 1); // 向上浮
    }

    /**
     * 指定元素上浮到堆顶
     * @param {*} key 
     */
    shiftup (key) {
        let parentKey = this.parentKey(key);
        while (key > 1 && this.compare(this.arr[key], this.arr[parentKey])) {
            this.swap(key, parentKey);
            key = parentKey;
            parentKey = this.parentKey(key);
        }
    }

    /**
     * 获取堆顶元素并去除堆顶
     * @returns 
     */
    pop () {
        if (this.arr.length === 1) return null; // 空堆直接return null
        this.swap(1, this.arr.length - 1);
        const head = this.arr.pop(); // 堆顶元素
        this.sinkDown(1); // 下沉元素
        return head;
    }

    sinkDown(k) {
        while(this.childLeftKey(k) <= this.size) {
            // 获取左右元素最大值，并何其对换
            let child = this.childLeftKey(k); // child 为左右节点的最大值
            if (child <= this.size && this.compare(this.arr[this.childRightKey(k)], this.arr[child])) {
                child = this.childRightKey(k);
            }

            if (this.compare(this.arr[k], this.arr[child])) { // 如果以满足大顶/小顶堆的要求，直接 return即可
                return;
            }

            this.swap(k, child);

            k = child;
        }
    }

    /**
     * 交换元素
     * @param {*} i 
     * @param {*} j 
     */
    swap (i, j) {
        [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
    }

}

