# 损失函数和优化损失函数 loss function and optimization
[第二节课的作业](https://cs231n.github.io/assignments2017/assignment1/)

## 1 how to find the best W in the train data

### 1.1 loss function 
可以用一个函数把W当做输入，然后看一下得分，定量地估计W的好坏。这个函数被称为损失函数。

有了loss function 之后 利用这个函数，找到最优的W，这个过程被称为optimization

#### 1.1.1 Multiclass  SVM 
$$\KaTeX$$ 
$$e=mc^2$$

引入Regularization去解决
 

#### 1.1.2 Softmax Classifier (Multinomial Logistic Regression)


### 1.2 optimization


通常你会想要
指定一些函数f,这在结构上可能非常复杂，
指定一些确定的损失函数，来决定你的算法做得好坏与否，
给定参数的任何值，一些正则化术语，决定如何惩罚模型的复杂性