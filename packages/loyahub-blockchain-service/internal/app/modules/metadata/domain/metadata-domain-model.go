package domain

type Metadata struct {
    TokenID     string `json:"tokenID"`
    Customer    string `json:"customer"`
    Description string `json:"description"`
    Image       string `json:"image"`
    Insight     string `json:"insight"`
    Attributes  []Attribute `json:"attributes"`
}

type Attribute struct {
    Type  string      `json:"type"`
    Value interface{} `json:"value"`
}

type Thresholds struct {
	PointsForPremium  int64
	PointsForGold     int64
	PointsForTitanium int64
}