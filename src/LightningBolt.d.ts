interface CustomAttachment {
	WorldPosition: Vector3;
	WorldAxis: Vector3;
}

interface LightningBolt {
	Destroy(): void;

	/**
	 * Calls Destroy() after TimeLength seconds where a dissipating effect takes place in the meantime
	 */
	DestroyDissipate(TimeLength?: number, Strength?: number): void;

	/**
	 * Hides bolt without removing any parts when false
	 */
	Enabled: boolean;

	/**
	 * Bolt originates from Attachment0 and ends at Attachment1
	 */
	Attachment0: CustomAttachment;

	/**
	 * Bolt originates from Attachment0 and ends at Attachment1
	 */
	Attachment1: CustomAttachment;

	/**
	 * Works similarly to roblox beams.
	 * See https://dk135eecbplh9.cloudfront.net/assets/blt160ad3fdeadd4ff2/BeamCurve1.png
	 */
	CurveSize0: number;

	/**
	 * Works similarly to roblox beams.
	 * See https://dk135eecbplh9.cloudfront.net/assets/blt160ad3fdeadd4ff2/BeamCurve1.png
	 */
	CurveSize1: number;

	/**
	 * Governs the amplitude of fluctuations throughout the bolt
	 */
	MinRadius: number;

	/**
	 * Governs the amplitude of fluctuations throughout the bolt
	 */
	MaxRadius: number;

	/**
	 * Governs the frequency of fluctuations throughout the bolt. Lower this to remove jittery-looking lightning
	 */
	Frequency: number;

	/**
	 * Governs how fast the bolt oscillates (i.e. how fast the fluctuating wave travels along bolt)
	 */
	AnimationSpeed: number;

	/**
	 * The thickness of the bolt
	 */
	Thickness: number;

	/**
	 * Multiplies Thickness value by a fluctuating random value between MinThicknessMultiplier and MaxThicknessMultiplier along the Bolt
	 */
	MinThicknessMultiplier: number;

	/**
	 * Multiplies Thickness value by a fluctuating random value between MinThicknessMultiplier and MaxThicknessMultiplier along the Bolt
	 */
	MaxThicknessMultiplier: number;

	/**
	 * Allows for fading in (or out) of the bolt with time. Can also create a "projectile" bolt
	 * Recommend setting AnimationSpeed to 0 if used as projectile (for better aesthetics)
	 * Works by passing a "wave" function which travels from left to right where the wave height represents opacity (opacity being 1 - Transparency)
	 * See https://www.desmos.com/calculator/hg5h4fpfim to help customise the shape of the wave with the below properties
	 */
	MinTransparency: number;

	/**
	 * Allows for fading in (or out) of the bolt with time. Can also create a "projectile" bolt
	 * Recommend setting AnimationSpeed to 0 if used as projectile (for better aesthetics)
	 * Works by passing a "wave" function which travels from left to right where the wave height represents opacity (opacity being 1 - Transparency)
	 * See https://www.desmos.com/calculator/hg5h4fpfim to help customise the shape of the wave with the below properties
	 */
	MaxTransparency: number;

	/**
	 * Bolt arrives at Attachment1 1/PulseSpeed seconds later
	 */
	PulseSpeed: number;

	PulseLength: number;

	FadeLength: number;

	/**
	 * Parts shorten or grow once their Transparency exceeds this value. Set to a value above 1 to turn effect off. See https://imgur.com/OChA441
	 */
	ContractFrom: number;

	/**
	 * Can be a Color3 or ColorSequence
	 */
	Color: Color3 | ColorSequence;

	/**
	 * Sets speed at which ColorSequence travels along Bolt
	 */
	ColorOffsetSpeed: number;

	/**
	 * Allows you to pass a custom space curve for the bolt to be defined along
	 * Constraints:
	 * - First input passed must be a parameter representing PercentAlongBolt between values 0 and 1
	 * Example: ```self.SpaceCurveFunction = VivianiCurve(PercentAlongBolt)```
	 */
	SpaceCurveFunction: (PercentAlongBolt: number, p0: Vector3, p1: Vector3, p2: Vector3, p3: Vector3) => Vector3;

	/**
	 * Allows you to pass a custom opacity profile which controls the opacity along the bolt
	 * Constraints:
	 * - First input passed must be a parameter representing PercentAlongBolt between values 0 and 1
	 * - Second input passed must be a parameter representing TimePassed since instantiation
	 * Example: ```self.OpacityProfileFunction = MovingSineWave(PercentAlongBolt, TimePassed)```
	 * Note: You may want to set self.ContractFrom to a value above 1 if you pass a custom opacity profile as contraction was designed to work with DiscretePulse
	 */
	OpacityProfileFunction: (
		PercentAlongBolt: number,
		TimePassed: number,
		PulseSpeed?: number,
		FadeLength?: number,
		MinOpacity?: number,
		MaxOpacity?: number,
	) => number;

	/**
	 * Allows you to pass a custom radial profile which controls the radius of control points along the bolt
	 * Constraints:
	 * - First input passed must be a parameter representing PercentAlongBolt between values 0 and 1
	 */
	RadialProfileFunction: (PercentAlongBolt: number) => number;
}

interface LightningBoltConstructor {
	/**
	 * You don't need to use actual Roblox Attachments. You can also create custom ones as follows:
	 * ```ts
	 * const customAttachment1 = {
	 * 	WorldPosition: customPosition1,
	 * 	WorldAxis: customAxis1,
	 * };
	 * const customAttachment2 = {
	 * 	WorldPosition: customPosition2,
	 * 	WorldAxis: customAxis2,
	 * };
	 * const bolt = new LightningBolt(customAttachment1, customAttachment2);
	 * ```
	 * `partCount` defaults to 30 if not specified.
	 */
	new (attachment0: CustomAttachment, attachment1: CustomAttachment, partCount?: number): LightningBolt;
}

declare const LightningBolt: LightningBoltConstructor;

export = LightningBolt;
