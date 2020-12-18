# 

## Fisrt classifier: Nearest Neighbor
- 训练集
```python
    def train(images, lables):
        # Machine learning!
        return model
```

- 测试集

```py
    def predict(model, test_images)
        # Use model to predict labels
        return test_labels
```
> CIFAR 10 数据集，可用于练习

## 0. L1 distance d(I1,I2) = 

### 曼哈顿距离

## 1. nearest neighbor classifier

```python
    import numpy as np

    class NearestNeighbor:
        def __init__(self): 
            pass
        def train(self, X, y):
            *** X is N x D where each row is an example. Y is 1-dimension of size N ***
            # the nearest neighbor classifier simply remember all the training Data
            self.Xtr = X
            self.ytr = y

        def pridict(self, X):
            ***X is N x D where each row is an example we wish to predict label for ***
            num_test = X.shape[0]
            # lets make sure that the output type matches the input type
            Ypred = np.zeros(num_test, dtype = self.ytr.dtype)

            # loop over all test rows
            for i in xrange(num_test): 
                # find the nearest training image to the i'th test image
                # using the L1 distance (sum of absolute value differences)
                distances = np.sum(np.abs(self.Xtr - X[i, :]), axis = 1)
                min_index = np.argmin(distances) # get the index with smallest distance
                Ypred[i] = self.ytr[min_index] #predict the label of the nearest example
            
            return Ypred
```

### 2. K nearest neighbors